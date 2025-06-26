// should return query string with given filter object
export const filteringMethod = (filterItems: any) => {
  if (!filterItems) {
    return "";
  }
  let queryParams = "";
  const hasLength = Object.keys(filterItems).length !== 0;
  // if empty
  if (!hasLength) {
    return "";
  }
  if (hasLength) {
    queryParams += "?";
  }

  Object.keys(filterItems).forEach((item, i) => {
    if (!filterItems[item]) {
      return;
    }

    if (i !== 0 && queryParams !== "?") {
      queryParams += "&";
    }

    queryParams = `${queryParams + item}=${filterItems[item]}`;
  });

  return queryParams === "?" ? "" : queryParams;
};
