import path from 'path';
import {
  makeSchema,
  objectType,
  queryType,
  nonNull,
  idArg,
  stringArg,
  intArg,
  fieldAuthorizePlugin,
  mutationType,
  asNexusMethod,
} from 'nexus';
import { nexusPrisma } from 'nexus-plugin-prisma';
import { transformAlphaVantageSymbolSearchResponse } from './helpers';
import { GraphQLDateTime } from 'graphql-iso-date';
import watchlistSharesResolver from './resolvers/watchlistShares';
import addShareToWatchlistResolver from './resolvers/addShareToWatchlist';

const GQLDate = asNexusMethod(GraphQLDateTime, 'dateTime');

export default makeSchema({
  shouldGenerateArtifacts: true,
  sourceTypes: {
    modules: [
      {
        module: require.resolve('../../node_modules/.prisma/client/index.d.ts'),
        alias: 'PrismaClient',
      },
      { module: require.resolve('./types/iexCloud.ts'), alias: 'IEX' },
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
          resolve: watchlistSharesResolver,
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
        t.int('shareId');
        t.string('symbol');
        t.string('companyName');
        t.float('latestPrice');
        t.float('change');
        t.float('changePercent');
        t.float('latestVolume', {
          resolve(source) {
            return source.latestVolume || null;
          },
        });
        t.float('open', {
          resolve(source) {
            return source.open || null;
          },
        });
        t.float('low', {
          resolve(source) {
            return source.low || null;
          },
        });
        t.float('high', {
          resolve(source) {
            return source.hight || null;
          },
        });
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
            name: nonNull(stringArg()),
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
            watchlistId: nonNull(idArg()),
          },
          resolve: addShareToWatchlistResolver,
        });
        t.nonNull.field('removeShareFromWatchList', {
          type: 'WatchlistShares',
          args: {
            shareId: nonNull(intArg()),
            watchlistId: nonNull(intArg()),
          },
          async resolve(_, { shareId, watchlistId }, { ctx, prisma }) {
            const watchlist = await prisma.watchlist.findFirst({
              where: { id: watchlistId, userId: ctx.state.user.id },
            });
            if (!watchlist) return ctx.resp.end(404);
            return prisma.watchlistShares.delete({
              where: { shareId_watchlistId: { shareId, watchlistId } },
            });
          },
        });
      },
    }),
  ],
});
