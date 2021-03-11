import { gql } from '@apollo/client';

export default gql`
  mutation CreatePortfolio($name: String!) {
    createPortfolio(name: $name) {
      id
    }
  }
`;
