/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPortfolio
// ====================================================

export interface GetPortfolio_portfolio {
  __typename: "Portfolio";
  id: number;
  name: string;
}

export interface GetPortfolio {
  portfolio: GetPortfolio_portfolio | null;
}

export interface GetPortfolioVariables {
  id: number;
}
