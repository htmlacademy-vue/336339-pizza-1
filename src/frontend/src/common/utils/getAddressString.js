const getAddressString = (address) => {
  const { street, building, flat } = address;
  return `${street}, д. ${building}${flat ? `, кв. ${flat}` : ""}`;
};

export default getAddressString;
