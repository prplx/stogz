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
} from 'nexus';
import { nexusPrisma } from 'nexus-plugin-prisma';
import { transformAlphaVantageSymbolSearchResponse } from './helpers';

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
        t.model.shares();
        t.model.user();
      },
    }),
    objectType({
      name: 'Share',
      definition(t) {
        t.model.id();
        t.model.name();
        t.model.type();
        t.model.symbol();
        t.model.currency();
        t.model.region();
        t.model.marketOpen();
        t.model.marketClose();
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
          type: 'Share',
          args: {
            symbol: nonNull(stringArg()),
            name: nonNull(stringArg()),
            type: nonNull(stringArg()),
            region: nonNull(stringArg()),
            currency: nonNull(stringArg()),
            marketOpen: nonNull(stringArg()),
            marketClose: nonNull(stringArg()),
            timezone: nonNull(stringArg()),
            watchlistId: nonNull(idArg({ description: 'id of the watchlist' })),
          },
          async resolve(_, { watchlistId, ...rest }, { prisma }) {
            let dbShare = await prisma.share.findUnique({
              where: { symbol: rest.symbol },
            });

            if (!dbShare) {
              dbShare = await prisma.share.create({ data: rest });
            }

            return prisma.watchlist.update({
              where: {
                id: +watchlistId,
              },
              data: {
                shares: {
                  connect: {
                    id: dbShare.id,
                  },
                },
              },
            });
          },
        });
      },
    }),
  ],
});
