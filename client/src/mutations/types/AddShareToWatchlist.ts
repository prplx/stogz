/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddShareToWatchlist
// ====================================================

export interface AddShareToWatchlist_addShareToWatchlist {
  __typename: "WatchlistShares";
  price: number;
}

export interface AddShareToWatchlist {
  addShareToWatchlist: AddShareToWatchlist_addShareToWatchlist;
}

export interface AddShareToWatchlistVariables {
  symbol: string;
  watchlistId: string;
}
