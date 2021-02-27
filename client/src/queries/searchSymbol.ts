import { gql } from '@apollo/client';

export default gql`
  query SearchSymbol($fragment: String!) {
    symbolSearch(fragment: $fragment) {
      securityName
      symbol
      region
      exchange
    }
  }
`;
