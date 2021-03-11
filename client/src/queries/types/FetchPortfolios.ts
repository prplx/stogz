/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchPortfolios
// ====================================================

export interface FetchPortfolios_portfolios {
  __typename: "Portfolio";
  id: number;
  name: string;
}

export interface FetchPortfolios {
  portfolios: (FetchPortfolios_portfolios | null)[] | null;
}
