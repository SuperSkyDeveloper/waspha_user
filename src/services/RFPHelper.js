export const filterRFPs = (data, status) => {
  let filterData = [];

  filterData = data.filter(item => {
    return item.status === status;
  });

  return filterData;
};
