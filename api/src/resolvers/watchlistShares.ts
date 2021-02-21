import { FieldResolver } from 'nexus';
import { diff } from 'fast-array-diff';
import { mhgetall, mhmset } from '../services/redis';

const watchlistShares: FieldResolver<'Watchlist', 'shares'> = async (
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
  const cached = (await mhgetall(symbols.map(s => `${s}:quote`))).filter(
    sh => sh.symbol
  );
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
};

export default watchlistShares;
