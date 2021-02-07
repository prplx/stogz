import { gql } from '@apollo/client';

export default gql`
  query SearchSymbol($symbol: String!) {
    symbolSearch(symbol: $symbol) {
      name
      symbol
      type
      region
      currency
      marketOpen
      marketClose
      timezone
    }
  }
`;
