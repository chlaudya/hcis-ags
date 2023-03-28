export const paginationNumber = (page, size, index) => {
  return page * size - size + index + 1;
};
