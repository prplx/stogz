import { gql } from '@apollo/client';

export default gql`
  query GetPortfolio($id: Int!) {
    portfolio(id: $id) {
      id
      name
    }
  }
`;
