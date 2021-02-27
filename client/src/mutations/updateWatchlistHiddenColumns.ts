import { gql } from '@apollo/client';

export default gql`
  mutation UpdateWatchlistHiddenColumns(
    $watchlistId: Int!
    $columns: [String]!
  ) {
    updateWatchlistHiddenColumns(watchlistId: $watchlistId, columns: $columns) {
      hiddenColumns
    }
  }
`;
