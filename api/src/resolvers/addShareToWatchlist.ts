import { FieldResolver } from 'nexus';
import { only } from '../helpers';

const addShareToWatchlist: FieldResolver<
  'Mutation',
  'addShareToWatchlist'
> = async (
  _,
  { watchlistId, symbol },
  { prisma, dataSources: { iexCloudAPI } }
) => {
  let price;
  let company;
  let logo;
  let dbShare = await prisma.share.findUnique({
    where: { symbol },
  });

  if (!dbShare) {
    ({
      [symbol]: { price, company, logo },
    } = await iexCloudAPI.batch([symbol], ['company', 'logo', 'price']));
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
};

export default addShareToWatchlist;
