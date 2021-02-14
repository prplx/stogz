import { Context, Next } from 'koa';
import { prisma } from '../services/prisma';

export default async function (ctx: Context, next: Next) {
  const authUser = ctx.state.user;

  if (!authUser) return await next();

  const dbUser = await prisma.user.findUnique({
    where: { sub: authUser.sub },
  });

  if (!dbUser) {
    ctx.state.user = {
      ...authUser,
      ...(await prisma.user.create({
        data: { sub: authUser.sub },
      })),
    };
  } else {
    ctx.state.user = { ...authUser, ...dbUser };
  }

  await next();
}
