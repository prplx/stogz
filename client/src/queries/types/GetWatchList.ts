/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetWatchList
// ====================================================

export interface GetWatchList_watchlist_shares {
  __typename: "Share";
  id: number;
  symbol: string;
  name: string;
  type: string;
  currency: string;
  region: string;
}

export interface GetWatchList_watchlist {
  __typename: "Watchlist";
  id: number;
  name: string;
  shares: GetWatchList_watchlist_shares[];
}

export interface GetWatchList {
  watchlist: GetWatchList_watchlist | null;
}

export interface GetWatchListVariables {
  id: string;
}
