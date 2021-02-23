/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveShareFromWatchlist
// ====================================================

export interface RemoveShareFromWatchlist_removeShareFromWatchList {
  __typename: "WatchlistShares";
  price: number;
}

export interface RemoveShareFromWatchlist {
  removeShareFromWatchList: RemoveShareFromWatchlist_removeShareFromWatchList;
}

export interface RemoveShareFromWatchlistVariables {
  shareId: number;
  watchlistId: number;
}
