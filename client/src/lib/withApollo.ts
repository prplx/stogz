import withApollo from 'next-with-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export default withApollo(({ initialState, ctx, headers }) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'http://localhost:3031/api/proxy',
    }),
    cache: new InMemoryCache().restore(initialState || {}),
    credentials: 'include',
    headers: {
      cookie: headers?.cookie,
    },
  });
});
