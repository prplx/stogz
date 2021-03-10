import { objectType } from 'nexus';

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
