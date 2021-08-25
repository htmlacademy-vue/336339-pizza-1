import { SIZES } from "@/common/constants";

const sizeToClientAdapter = (pizzaSize) => {
  return {
    ...pizzaSize,
    value: pizzaSize.multiplier ? SIZES[pizzaSize.multiplier] : "",
    isChecked: pizzaSize.id === 2,
  };
};

export default sizeToClientAdapter;
