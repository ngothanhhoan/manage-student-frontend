import _ from "lodash";

const findAndUpdate = (listData, payload) => {
  const newListData = [...listData];
  const indexOfData = newListData.findIndex((item) => item.id === payload.id);
  newListData.splice(indexOfData, 1, payload);

  return newListData;
};

export { findAndUpdate };
