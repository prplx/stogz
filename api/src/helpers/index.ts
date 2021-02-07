import { SymbolSearchResponse } from '../types/AlphaVantage';

export function transformAlphaVantageSymbolSearchResponse(
  resp: SymbolSearchResponse
) {
  if (!resp || !resp.bestMatches || !Array.isArray(resp.bestMatches))
    throw new Error('Incorrect AlphaVantage symbol search response data');

  return resp.bestMatches.map((bm: { [key: string]: string }) =>
    Object.keys(bm).reduce(
      (acc, curr) => ({ ...acc, [curr.replace(/^\d+\.\s/, '')]: bm[curr] }),
      {}
    )
  );
}
