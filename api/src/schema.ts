import path from 'path';
import {
  makeSchema,
  objectType,
  queryType,
  nonNull,
  idArg,
  stringArg,
  fieldAuthorizePlugin,
  mutationType,
  asNexusMethod,
} from 'nexus';
import { nexusPrisma } from 'nexus-plugin-prisma';
import { transformAlphaVantageSymbolSearchResponse, only } from './helpers';
import { mhgetall, mhmset } from './services/redis';
import { diff } from 'fast-array-diff';
import { GraphQLDateTime } from 'graphql-iso-date';

const GQLDate = asNexusMethod(GraphQLDateTime, 'dateTime');

export default makeSchema({
  shouldGenerateArtifacts: true,
  sourceTypes: {
    modules: [
      {
        module: require.resolve('../../node_modules/.prisma/client/index.d.ts'),
        alias: 'PrismaClient',
      },
    ],
  },
  contextType: {
    module: path.join(__dirname, './context.ts'),
    export: 'Context',
  },
  outputs: {
    typegen: path.join(__dirname, '../typegen.d.ts'),
    schema: path.join(__dirname, '../schema.graphql'),
  },
  plugins: [
    nexusPrisma({
      experimentalCRUD: false,
    }),
    fieldAuthorizePlugin(),
  ],
  types: [
    GQLDate,
    objectType({
      name: 'User',
      definition(t) {
        t.model.id();
        t.model.sub();
        t.model.email();
        t.model.givenName();
        t.model.familyName();
        t.model.picture();
        t.model.watchlists();
      },
    }),
    objectType({
      name: 'Watchlist',
      definition(t) {
        t.model.id();
        t.model.name();
        t.model.user();
        t.list.field('shares', {
          type: 'ShareQuote',
          resolve: async (
            parent,
            _,
            { prisma, dataSources: { iexCloudAPI } }
          ) => {
            const data = await prisma.watchlist.findUnique({
              where: { id: parent.id },
              include: { shares: { include: { share: true } } },
            });
            const symbols = data?.shares.map(d => d.share.symbol) || [];
            const normalizedData: {
              [key: string]: { addetAt: number; addedPrice: number };
            } =
              data?.shares.reduce((acc, curr) => {
                return {
                  ...acc,
                  [curr.share.symbol]: {
                    addedAt: curr.createdAt,
                    addedPrice: curr.price,
                  },
                };
              }, {}) || {};
            const cached = (
              await mhgetall(symbols.map(s => `${s}:quote`))
            ).filter(sh => sh.symbol);
            const cachedKeys = cached.map(c => c.symbol);
            const diffKeys = diff(symbols, cachedKeys).removed;
            let freshData: Record<string, { quote: {} }> | null = null;

            if (diffKeys.length) {
              freshData = await iexCloudAPI.batch(diffKeys, ['quote']);
              freshData &&
                (await mhmset(
                  Object.entries(freshData).map(entry => [
                    `${entry[0]}:quote`,
                    entry[1].quote,
                  ]),
                  60 * 15
                ));
            }

            return [
              ...cached,
              ...(freshData ? Object.values(freshData).map(d => d.quote) : []),
            ].map(share => {
              const normalized = normalizedData[share.symbol];
              return {
                ...share,
                ...normalized,
                changeSinceAdded: +share.latestPrice - normalized.addedPrice,
                changePercentSinceAdded:
                  (100 * (+share.latestPrice - normalized.addedPrice)) /
                  ((+share.latestPrice + normalized.addedPrice) / 2),
              };
            });
          },
        });
      },
    }),
    objectType({
      name: 'Share',
      definition(t) {
        t.model.id();
        t.model.companyName();
        t.model.symbol();
        t.model.issueType();
        t.model.description();
        t.model.exchange();
        t.model.sector();
        t.model.industry();
        t.model.country();
      },
    }),
    objectType({
      name: 'WatchlistShares',
      definition(t) {
        t.model.price();
      },
    }),
    objectType({
      name: 'AlphaVantageSymbol',
      definition(t) {
        t.string('symbol');
        t.string('name');
        t.string('type');
        t.string('region');
        t.string('marketOpen');
        t.string('marketClose');
        t.string('timezone');
        t.string('currency');
      },
    }),
    objectType({
      name: 'ShareQuote',
      definition(t) {
        t.string('symbol');
        t.string('companyName');
        t.float('latestPrice');
        t.float('change');
        t.float('changePercent');
        t.string('latestVolume');
        t.string('open');
        t.string('low');
        t.string('high');
        t.float('addedPrice');
        t.float('latestUpdate');
        // @ts-ignore because Nexus is a crap
        t.dateTime('addedAt');
        t.float('changeSinceAdded');
        t.float('changePercentSinceAdded');
      },
    }),
    queryType({
      definition(t) {
        t.field('watchlist', {
          type: 'Watchlist',
          args: {
            id: nonNull(idArg({ description: 'id of the watchlist' })),
          },
          resolve(_, { id }, { ctx, prisma }) {
            return prisma.watchlist.findFirst({
              where: { id: +id, userId: ctx.state.user.id },
            });
          },
        });
        t.list.field('watchlists', {
          type: 'Watchlist',
          resolve(_, __, { ctx, prisma }) {
            return prisma.watchlist.findMany({
              where: { userId: ctx.state.user.id },
            });
          },
        });
        t.list.field('symbolSearch', {
          type: 'AlphaVantageSymbol',
          args: {
            symbol: nonNull(stringArg({ description: 'symbol' })),
          },
          async resolve(_, { symbol }, { dataSources: { alphaVantageAPI } }) {
            const data = await alphaVantageAPI.symbolSearch(symbol);
            return transformAlphaVantageSymbolSearchResponse(data);
          },
        });
      },
    }),
    mutationType({
      definition(t) {
        t.nonNull.field('createWatchlist', {
          type: 'Watchlist',
          args: {
            name: nonNull(stringArg({ description: 'title of the watchlist' })),
          },
          resolve(_, { name }, { ctx, prisma }) {
            return prisma.watchlist.create({
              data: { userId: ctx.state.user.id, name },
            });
          },
        });
        t.nonNull.field('addShareToWatchlist', {
          type: 'WatchlistShares',
          args: {
            symbol: nonNull(stringArg()),
            watchlistId: nonNull(idArg({ description: 'id of the watchlist' })),
          },
          async resolve(
            _,
            { watchlistId, symbol },
            { prisma, dataSources: { iexCloudAPI } }
          ) {
            let price;
            let company;
            let logo;
            let dbShare = await prisma.share.findUnique({
              where: { symbol },
            });

            if (!dbShare) {
              ({
                [symbol]: { price, company, logo },
              } = await iexCloudAPI.batch(
                [symbol],
                ['company', 'logo', 'price']
              ));
              dbShare = await prisma.share.create({
                data: {
                  symbol,
                  ...(only(company, [
                    'companyName',
                    'issueType',
                    'description',
                    'exchange',
                    'sector',
                    'industry',
                    'country',
                    'website',
                  ]) as any),
                  logo: logo.url,
                },
              });
            }

            price = price || (await iexCloudAPI.price(symbol));

            return prisma.watchlistShares.create({
              data: {
                watchlist: {
                  connect: {
                    id: +watchlistId,
                  },
                },
                share: {
                  connect: {
                    id: dbShare.id,
                  },
                },
                price,
              },
            });
          },
        });
      },
    }),
  ],
});
