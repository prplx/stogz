// @ts-nocheck
import { transformAlphaVantageSymbolSearchResponse } from '.';

describe('transformAlphaVantageSymbolSearchResponse', () => {
  it('should correctly transfrom alpha vantage response with data', () => {
    const data = {
      bestMatches: [
        {
          '1. symbol': 'TESO',
          '2. name': 'Tesco Corporation USA',
          '3. type': 'Equity',
          '4. region': 'United States',
          '5. marketOpen': '09:30',
          '6. marketClose': '16:00',
          '7. timezone': 'UTC-05',
          '8. currency': 'USD',
          '9. matchScore': '0.8889',
        },
        {
          '11. symbol': 'TSCO.LON',
          '12. name': 'Tesco PLC',
          '1300. type': 'Equity',
          '999. region': 'United Kingdom',
          '1. marketOpen': '08:00',
          '84000. marketClose': '16:30',
          '17. timezone': 'UTC+00',
          '18. currency': 'GBP',
          '19. matchScore': '0.7273',
        },
      ],
    };

    expect(transformAlphaVantageSymbolSearchResponse(data)).toEqual([
      {
        symbol: 'TESO',
        name: 'Tesco Corporation USA',
        type: 'Equity',
        region: 'United States',
        marketOpen: '09:30',
        marketClose: '16:00',
        timezone: 'UTC-05',
        currency: 'USD',
        matchScore: '0.8889',
      },
      {
        symbol: 'TSCO.LON',
        name: 'Tesco PLC',
        type: 'Equity',
        region: 'United Kingdom',
        marketOpen: '08:00',
        marketClose: '16:30',
        timezone: 'UTC+00',
        currency: 'GBP',
        matchScore: '0.7273',
      },
    ]);
  });

  it('should correctly transform response if there is no returned data', () => {
    expect(
      transformAlphaVantageSymbolSearchResponse({ bestMatches: [] })
    ).toEqual([]);
  });

  it('should throw incorrect response data in such case', () => {
    function transform(arg) {
      return transformAlphaVantageSymbolSearchResponse(arg);
    }
    expect(() => transform()).toThrowError(
      new Error('Incorrect AlphaVantage symbol search response data')
    );
    expect(() => transform(1)).toThrowError(
      new Error('Incorrect AlphaVantage symbol search response data')
    );
    expect(() => transform('one')).toThrowError(
      new Error('Incorrect AlphaVantage symbol search response data')
    );
    expect(() => transform({})).toThrowError(
      new Error('Incorrect AlphaVantage symbol search response data')
    );
    expect(() => transform([])).toThrowError(
      new Error('Incorrect AlphaVantage symbol search response data')
    );
    expect(() => transform(null)).toThrowError(
      new Error('Incorrect AlphaVantage symbol search response data')
    );
    expect(() => transform({ bestMatches: {} })).toThrowError(
      new Error('Incorrect AlphaVantage symbol search response data')
    );
  });
});
