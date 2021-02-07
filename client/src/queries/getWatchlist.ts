import { gql } from '@apollo/client';

export default gql`
  query GetWatchList($id: ID!) {
    watchlist(id: $id) {
      id
      name
      shares {
        id
        symbol
        name
        type
        currency
        region
      }
    }
  }
`;
