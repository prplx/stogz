import { NextPageContext, GetServerSidePropsContext } from 'next';
import Router from 'next/router';
import auth0 from '../utils/auth0';

export const isServer = () => typeof window === 'undefined';

export const isClient = () => !isServer();

export const isBrowser = isClient;

export const redirect = (
  uri: string,
  ctx: NextPageContext | GetServerSidePropsContext
) => {
  if (isServer()) ctx.res!.writeHead(302, { Location: uri }).end();
  else Router.push(uri);
};

export const protect = async (
  ctx: NextPageContext | GetServerSidePropsContext
) => {
  if (typeof window === 'undefined') {
    const session = await auth0.getSession(ctx.req!);
    if (!session || !session.user) {
      ctx.res!.writeHead(302, {
        Location: '/api/login',
      });
      ctx.res!.end();
      return;
    }
    return session.user;
  }
};
