import { SIZES } from "@/common/constants";

const sizesToClientAdapter = (sizes = []) => {
  return sizes.reduce((accumulator, pizzaSize) => {
    accumulator[pizzaSize.id] = {
      ...pizzaSize,
      value: pizzaSize.multiplier ? SIZES[pizzaSize.multiplier] : "",
    };
    return accumulator;
  }, {});
};

export default sizesToClientAdapter;
