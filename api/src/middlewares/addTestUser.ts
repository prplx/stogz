import { Context, Next } from 'koa';
import { prisma } from '../services/prisma';

export default async function (ctx: Context, next: Next) {
  if (process.env.NODE_ENV !== 'test') return await next();

  const user = await prisma.user.upsert({
    where: {
      sub: 'test-user',
    },
    update: {},
    create: {
      sub: 'test-user',
    },
  });
  ctx.state.user = user;
  await next();
}
