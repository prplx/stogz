import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { getStringEnv } from 'env-guard';

export default class AlphaVantageDataSource extends RESTDataSource {
  private apiKey: string;

  constructor() {
    super();
    this.apiKey = getStringEnv('ALPHA_VANTAGE_API_KEY');
    this.baseURL = getStringEnv('ALPHA_VANTAGE_URL');
  }

  willSendRequest(request: RequestOptions) {
    request.params.set('apikey', this.apiKey);
  }

  async symbolSearch(symbol: string) {
    return this.get(`/query?function=SYMBOL_SEARCH&keywords=${symbol}`);
  }

  async companyOverview(symbol: string) {
    return this.get(`/query?function=OVERVIEW&symbol=${symbol}`);
  }
}
