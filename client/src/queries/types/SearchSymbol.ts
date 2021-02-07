/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchSymbol
// ====================================================

export interface SearchSymbol_symbolSearch {
  __typename: "AlphaVantageSymbol";
  name: string | null;
  symbol: string | null;
  type: string | null;
  region: string | null;
  currency: string | null;
  marketOpen: string | null;
  marketClose: string | null;
  timezone: string | null;
}

export interface SearchSymbol {
  symbolSearch: (SearchSymbol_symbolSearch | null)[] | null;
}

export interface SearchSymbolVariables {
  symbol: string;
}
