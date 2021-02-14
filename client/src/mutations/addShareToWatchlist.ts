import { gql } from '@apollo/client';

export default gql`
  mutation AddShareToWatchlist($symbol: String!, $watchlistId: ID!) {
    addShareToWatchlist(symbol: $symbol, watchlistId: $watchlistId) {
      price
    }
  }
`;
