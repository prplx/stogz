import App, { AppProps, AppContext } from 'next/app';
import Router from 'next/router';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { UserProvider } from '@auth0/nextjs-auth0';
import { Helmet } from 'react-helmet';
import NProgress from 'nprogress';
import withApollo from '../lib/withApollo';
import 'nprogress/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => {
  return NProgress.done();
});
Router.events.on('routeChangeError', () => NProgress.done());

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
      '#nprogress .spinner': {
        display: 'none',
      },
    },
  },
  fonts: {
    heading: 'IBM Plex Sans, sans-serif',
    body: 'IBM Plex Sans, sans-serif',
  },
});

function MyApp({
  Component,
  pageProps,
  apollo,
}: AppProps & { apollo: ApolloClient<null> }) {
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <ApolloProvider client={apollo}>
        <ChakraProvider theme={theme}>
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </ChakraProvider>
      </ApolloProvider>
    </>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  return {
    pageProps: { ...appProps },
  };
};

export default withApollo((MyApp as unknown) as typeof App);
