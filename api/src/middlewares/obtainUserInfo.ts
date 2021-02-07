import { Context, Next } from 'koa';
import axios from 'axios';
import { prisma } from '../services/prisma';
import config from '../config';

export default async function (ctx: Context, next: Next) {
  await next();

  if (!ctx.state.user) return;
  if (ctx.state.user.email || ctx.state.user.familyName) return;
  if (!ctx.header || !ctx.header.authorization) return;

  const parts = ctx.header.authorization.trim().split(' ');

  if (parts.length === 2) {
    const scheme = parts[0];
    const token = parts[1];

    if (/^Bearer$/i.test(scheme)) {
      const userInfo = (
        await axios.get(`${config.auth0Issuer}userinfo`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ).data;

      if (!userInfo) return;

      await prisma.user.update({
        where: { sub: ctx.state.user.sub },
        data: {
          email: userInfo.email,
          givenName: userInfo.given_name,
          familyName: userInfo.family_name,
          picture: userInfo.picture,
        },
      });
    }
  }
}
