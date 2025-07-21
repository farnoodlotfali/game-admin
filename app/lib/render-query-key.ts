// should return query string with given filter object
export const renderQueryKey = (QUERY_KEYS: any[]): any[] => {
  const newQUERY_KEYS: any[] = QUERY_KEYS;

  QUERY_KEYS.forEach((item, i) => {
    if (!item || item === "" || (typeof item === "object" && Object.keys(item).length === 0)) {
      newQUERY_KEYS.splice(i, 1);
    }
  });

  return newQUERY_KEYS;
};
