/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchSymbol
// ====================================================

export interface SearchSymbol_symbolSearch {
  __typename: "IEXSearchResult";
  securityName: string | null;
  symbol: string | null;
  region: string | null;
  exchange: string | null;
}

export interface SearchSymbol {
  symbolSearch: (SearchSymbol_symbolSearch | null)[] | null;
}

export interface SearchSymbolVariables {
  fragment: string;
}
