import App, { AppProps, AppContext } from 'next/app';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
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

function MyApp({ Component, pageProps, apollo }: AppProps & { apollo: any }) {
  return (
    <ApolloProvider client={apollo}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
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

// @ts-ignore
export default withApollo(MyApp);
