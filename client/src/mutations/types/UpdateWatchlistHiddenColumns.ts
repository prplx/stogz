/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateWatchlistHiddenColumns
// ====================================================

export interface UpdateWatchlistHiddenColumns_updateWatchlistHiddenColumns {
  __typename: "Watchlist";
  hiddenColumns: any | null;
}

export interface UpdateWatchlistHiddenColumns {
  updateWatchlistHiddenColumns: UpdateWatchlistHiddenColumns_updateWatchlistHiddenColumns;
}

export interface UpdateWatchlistHiddenColumnsVariables {
  watchlistId: number;
  columns: (string | null)[];
}
