import withApollo from 'next-with-apollo';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ServerError,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ networkError }) => {
  if (networkError) {
    console.log((networkError as ServerError).statusCode);
  }
});

export default withApollo(
  ({ initialState, headers }) =>
    new ApolloClient({
      ssrMode: typeof window === 'undefined',
      link: errorLink.concat(
        new HttpLink({
          uri: `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/proxy`,
          credentials: 'include',
          headers: {
            cookie: headers?.cookie,
          },
        })
      ),
      cache: new InMemoryCache().restore(initialState || {}),
    })
);
