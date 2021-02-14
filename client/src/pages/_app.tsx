import App, { AppProps, AppContext } from 'next/app';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import withApollo from '../lib/withApollo';
import auth0 from '../utils/auth0';
import { ISession } from '@auth0/nextjs-auth0/dist/session/session';

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      'html, body': {
        color: 'white',
        background: 'gray.700',
      },
    },
  },
});

function MyApp({
  Component,
  pageProps,
  apollo,
  user,
}: AppProps & { apollo: ApolloClient<null>; user?: ISession['user'] }) {
  return (
    <ApolloProvider client={apollo}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} user={user} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const { ctx } = appContext;
  let session: { user: {} };

  if (ctx.res) {
    session = await auth0.getSession(ctx.req!);
    if (!session || !session.user) {
      ctx.res!.writeHead(302, {
        Location: '/api/login',
      });
      ctx.res!.end();
      return;
    }
  }

  return {
    pageProps: { ...appProps },
    user: session?.user,
  };
};

export default withApollo((MyApp as unknown) as typeof App);
