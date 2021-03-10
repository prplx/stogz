import { Context as KoaContext } from 'koa';
import { PrismaClient } from '@prisma/client';
import IExCloudAPI from './apollo/iexCloud';

export type Context = {
  prisma: PrismaClient;
  ctx: KoaContext;
  dataSources: {
    iexCloudAPI: IExCloudAPI;
  };
};
