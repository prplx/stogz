import { gql } from '@apollo/client';

export default gql`
  query GetWatchList($id: ID!) {
    watchlist(id: $id) {
      id
      name
      shares {
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
    }
  }
`;
