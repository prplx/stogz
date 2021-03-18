import { gql } from '@apollo/client';

export default gql`
  query GetWatchList($id: Int!) {
    watchlist(id: $id) {
      id
      name
      shares {
        shareId
        symbol
        companyName
        latestPrice
        change
        changePercent
        latestVolume
        latestUpdate
        addedAt
        addedPrice
        open
        low
        high
        changeSinceAdded
        changePercentSinceAdded
      }
      hiddenColumns
    }
  }
`;
