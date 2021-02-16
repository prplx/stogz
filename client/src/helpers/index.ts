import { NextPageContext, GetServerSidePropsContext } from 'next';
import Router from 'next/router';

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
