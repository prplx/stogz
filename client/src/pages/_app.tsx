import App, { AppProps, AppContext } from 'next/app';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { UserProvider } from '@auth0/nextjs-auth0';
import withApollo from '../lib/withApollo';

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
}: AppProps & { apollo: ApolloClient<null> }) {
  return (
    <ApolloProvider client={apollo}>
      <ChakraProvider theme={theme}>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  return {
    pageProps: { ...appProps },
  };
};

export default withApollo((MyApp as unknown) as typeof App);
