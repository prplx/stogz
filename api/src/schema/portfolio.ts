import { objectType, extendType, nonNull, stringArg, intArg } from 'nexus';

export const Portfolio = objectType({
  name: 'Portfolio',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.user();
    t.model.shares(null!);
    t.model.createdAt();
  },
});

export const PorfolioShares = objectType({
  name: 'PortfolioShares',
  definition(t) {
    t.model.createdAt();
  },
});

export const FetchPortfolios = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('portfolios', {
      type: 'Portfolio',
      resolve(_, __, { prisma, ctx }) {
        return prisma.portfolio.findMany({
          where: { userId: ctx.state.user.id },
          orderBy: [{ id: 'asc' }],
        });
      },
    });
  },
});

export const GetPortfolio = extendType({
  type: 'Query',
  definition(t) {
    t.field('portfolio', {
      type: 'Portfolio',
      args: {
        id: nonNull(intArg()),
      },
      resolve(_, { id }, { prisma, ctx }) {
        return prisma.portfolio.findFirst({
          where: {
            id,
            userId: ctx.user.id,
          },
        });
      },
    });
  },
});

export const CreatePortfolio = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createPortfolio', {
      type: 'Portfolio',
      args: {
        name: nonNull(stringArg()),
      },
      resolve(_, { name }, { prisma, ctx }) {
        return prisma.portfolio.create({
          data: { userId: ctx.state.user.id, name },
        });
      },
    });
  },
});
