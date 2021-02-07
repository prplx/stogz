/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchWatchlists
// ====================================================

export interface FetchWatchlists_watchlists {
  __typename: "Watchlist";
  id: number;
  name: string;
}

export interface FetchWatchlists {
  watchlists: (FetchWatchlists_watchlists | null)[] | null;
}
