import { gql } from '@apollo/client';

export default gql`
  query FetchWatchlists {
    watchlists {
      id
      name
    }
  }
`;
