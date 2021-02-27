import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { getStringEnv } from 'env-guard';

export default class IExCloud extends RESTDataSource {
  private token: string;

  constructor() {
    super();
    this.baseURL = getStringEnv('IEX_CLOUD_URL');
    this.token = getStringEnv('IEX_CLOUD_TOKEN');
  }

  willSendRequest(request: RequestOptions) {
    request.params.set('token', this.token);
  }

  async search(fragment: string) {
    return this.get(`/search/${fragment}`);
  }

  async quote(symbol: string) {
    return this.get(`/stock/${symbol}/quote?displayPercent=true`);
  }

  async price(symbol: string) {
    return this.get<number>(`/stock/${symbol}/price`);
  }

  async company(symbol: string) {
    return this.get(`/stock/${symbol}/company`);
  }

  async batch(
    symbols: string[],
    types: ('price' | 'company' | 'logo' | 'quote')[]
  ) {
    return this.get(
      `/stock/market/batch?symbols=${symbols.join(',')}&types=${types.join(
        ','
      )}&displayPercent=true`
    );
  }
}
