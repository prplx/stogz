/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddShareToWatchlist
// ====================================================

export interface AddShareToWatchlist_addShareToWatchlist {
  __typename: "Share";
  id: number;
}

export interface AddShareToWatchlist {
  addShareToWatchlist: AddShareToWatchlist_addShareToWatchlist;
}

export interface AddShareToWatchlistVariables {
  symbol: string;
  name: string;
  type: string;
  region: string;
  currency: string;
  marketOpen: string;
  marketClose: string;
  timezone: string;
  watchlistId: string;
}
