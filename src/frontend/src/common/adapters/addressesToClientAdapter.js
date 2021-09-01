const addressesToClientAdapter = (addresses = []) => {
  return addresses.reduce((accumulator, currentItem) => {
    accumulator[currentItem.id] = {
      ...currentItem,
    };
    return accumulator;
  }, {});
};

export default addressesToClientAdapter;
