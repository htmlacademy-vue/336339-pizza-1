const miscToClientAdapter = (misc = []) => {
  return misc.reduce((accumulator, currentItem) => {
    accumulator[currentItem.id] = {
      ...currentItem,
      count: 0,
    };
    return accumulator;
  }, {});
};

export default miscToClientAdapter;
