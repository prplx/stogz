import { gql } from '@apollo/client';

export default gql`
  query FetchPortfolios {
    portfolios {
      id
      name
    }
  }
`;
