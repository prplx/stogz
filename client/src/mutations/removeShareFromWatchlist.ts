import { gql } from '@apollo/client';

export default gql`
  mutation RemoveShareFromWatchlist($shareId: Int!, $watchlistId: Int!) {
    removeShareFromWatchList(shareId: $shareId, watchlistId: $watchlistId) {
      price
    }
  }
`;
