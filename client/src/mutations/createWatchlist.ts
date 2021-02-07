import { gql } from '@apollo/client';

export default gql`
  mutation CreateWatchlist($name: String!) {
    createWatchlist(name: $name) {
      id
    }
  }
`;
