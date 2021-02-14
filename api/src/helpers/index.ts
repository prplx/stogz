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

export function lowerCaseObjectKeys(obj: { [key: string]: any }) {
  return Object.fromEntries(
    Object.entries(obj).map(entry => [entry[0].toLowerCase(), entry[1]])
  );
}

export function only(
  obj: { [key: string]: any },
  fields: Array<keyof typeof obj>
) {
  return fields.reduce((acc, curr) => ({ ...acc, [curr]: obj[curr] }), {});
}
