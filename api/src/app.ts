import Koa from 'koa';
import { prisma } from './services/prisma';
import { ApolloServer } from 'apollo-server-koa';
import cors from '@koa/cors';
import schema from './schema';
import { jwtAuth, saveUserToDB, obtainUserInfo } from './middlewares';
import AlphaVantageAPI from './apollo/alphaVantageDataSource';

const app = new Koa();
const apollo = new ApolloServer({
  dataSources: () => ({
    alphaVantageAPI: new AlphaVantageAPI(),
  }),
  context: ({ ctx }) => ({ prisma, ctx }),
  schema,
});

async function main() {
  app
    .use(
      cors({
        origin: '*',
      })
    )
    .use(jwtAuth)
    .use(saveUserToDB)
    .use(obtainUserInfo)
    .use(apollo.getMiddleware({ cors: false }));
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default app;
