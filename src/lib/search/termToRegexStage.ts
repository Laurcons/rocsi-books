
/**
 * Takes a user search term and returns a regex that will match that term.
 */
export function termToRegexStage(term: string) {
  return {
    $regex:
      term
        .replaceAll('a', '[aăâ]')
        .replaceAll('i', '[iî]')
        .replaceAll('t', '[tț]')
        .replaceAll('s', '[sș]'),
    $options: 'i'
  };
}