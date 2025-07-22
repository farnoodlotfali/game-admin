/**
 * Filters out empty, null, or undefined elements from the given array of query keys.
 * This function iterates over each item in the provided `QUERY_KEYS` array, checking for invalid values
 * such as `null`, `undefined`, empty strings, or empty objects. Invalid items are removed from the array.
 *
 * @param QUERY_KEYS - An array of query keys which can contain various data types like strings, objects, or any other value.
 * @returns - A new array containing only the valid query keys. Invalid entries (empty strings, null, undefined, or empty objects) are excluded.
 */
export const renderQueryKey = (QUERY_KEYS: any[]): any[] => {
  const newQUERY_KEYS: any[] = QUERY_KEYS;

  QUERY_KEYS.forEach((item, i) => {
    if (!item || item === "" || (typeof item === "object" && Object.keys(item).length === 0)) {
      newQUERY_KEYS.splice(i, 1);
    }
  });

  return newQUERY_KEYS;
};
