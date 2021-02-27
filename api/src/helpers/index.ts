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
