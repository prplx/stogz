import { Context as KoaContext } from 'koa';
import { PrismaClient } from '@prisma/client';
import AlphaVantageAPI from './apollo/alphaVantageDataSource';
import IExCloudAPI from './apollo/iexCloud';

export type Context = {
  prisma: PrismaClient;
  ctx: KoaContext;
  dataSources: {
    alphaVantageAPI: AlphaVantageAPI;
    iexCloudAPI: IExCloudAPI;
  };
};
