import { gql } from '@apollo/client';

export default gql`
  mutation AddShareToWatchlist(
    $symbol: String!
    $name: String!
    $type: String!
    $region: String!
    $currency: String!
    $marketOpen: String!
    $marketClose: String!
    $timezone: String!
    $watchlistId: ID!
  ) {
    addShareToWatchlist(
      symbol: $symbol
      name: $name
      type: $type
      region: $region
      currency: $currency
      marketOpen: $marketOpen
      marketClose: $marketClose
      timezone: $timezone
      watchlistId: $watchlistId
    ) {
      id
    }
  }
`;
