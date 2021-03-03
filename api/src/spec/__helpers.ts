import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import getPort, { makeRange } from 'get-port';
import { GraphQLClient } from 'graphql-request';
import { join } from 'path';
import { Client } from 'pg';
import { createHttpTerminator, HttpTerminator } from 'http-terminator';
import app from '../app';
import { prisma } from '../services/prisma';
import redis from '../services/redis';

type TestContext = {
  client: GraphQLClient;
  prisma: PrismaClient;
};
export function createTestContext(): TestContext {
  let ctx = {} as TestContext;
  const graphqlCtx = graphqlTestContext();
  const prismaCtx = prismaTestContext();

  beforeAll(async () => {
    const prisma = await prismaCtx.before();
    const client = await graphqlCtx.before();
    Object.assign(ctx, {
      client,
      prisma,
    });
  });

  afterAll(async done => {
    await graphqlCtx.after(done);
    await prismaCtx.after(done);
  });
  return ctx;
}
function graphqlTestContext() {
  let terminator: HttpTerminator;

  return {
    async before() {
      const port = await getPort({ port: makeRange(4000, 6000) });
      const server = app.listen({ port });
      terminator = createHttpTerminator({ server });
      return new GraphQLClient(`http://localhost:${port}/graphql`);
    },
    async after(done: jest.DoneCallback) {
      await terminator.terminate();
      redis.disconnect();
      done();
    },
  };
}
function prismaTestContext() {
  const prismaBinary = join(
    __dirname,
    '../..',
    'node_modules',
    '.bin',
    'prisma'
  );
  return {
    async before() {
      execSync(`${prismaBinary} migrate dev --preview-feature`, {
        env: {
          ...process.env,
        },
      });
      return prisma;
    },
    async after(done: jest.DoneCallback) {
      const client = new Client({
        connectionString: process.env.DATABASE_URL,
      });
      await client.connect();
      await client.query(`DROP SCHEMA IF EXISTS "public" CASCADE`);
      await client.end();
      prisma.$disconnect();
      done();
    },
  };
}
