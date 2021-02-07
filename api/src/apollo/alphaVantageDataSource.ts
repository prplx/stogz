import { RESTDataSource } from 'apollo-datasource-rest';
import { getStringEnv } from 'env-guard';

export default class AlphaVantageDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://www.alphavantage.co';
  }

  async symbolSearch(symbol: string) {
    return this.get(
      `/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${getStringEnv(
        'ALPHA_VANTAGE_API_KEY'
      )}`
    );
  }
}
