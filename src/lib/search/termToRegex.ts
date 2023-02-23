
/**
 * Takes a user search term and returns a regex that will match that term.
 */
export function termToRegex(term: string) {
  return new RegExp(
    term
      .replaceAll('a', '[aăâ]')
      .replaceAll('i', '[iî]')
      .replaceAll('t', '[tț]')
      .replaceAll('s', '[tș]'),
    'i'
  );
}