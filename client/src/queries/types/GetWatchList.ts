/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetWatchList
// ====================================================

export interface GetWatchList_watchlist_shares {
  __typename: "ShareQuote";
  symbol: string | null;
  companyName: string | null;
  latestPrice: number | null;
  change: number | null;
  changePercent: number | null;
  latestVolume: string | null;
  latestUpdate: number | null;
  addedAt: any | null;
  addedPrice: number | null;
  open: string | null;
  low: string | null;
  high: string | null;
}

export interface GetWatchList_watchlist {
  __typename: "Watchlist";
  id: number;
  name: string;
  shares: (GetWatchList_watchlist_shares | null)[] | null;
}

export interface GetWatchList {
  watchlist: GetWatchList_watchlist | null;
}

export interface GetWatchListVariables {
  id: string;
}
