import withApollo from 'next-with-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export default withApollo(
  ({ initialState, headers }) =>
    new ApolloClient({
      ssrMode: typeof window === 'undefined',
      link: new HttpLink({
        uri: `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/proxy`,
        credentials: 'include',
        headers: {
          cookie: headers?.cookie,
        },
      }),
      cache: new InMemoryCache().restore(initialState || {}),
    })
);
