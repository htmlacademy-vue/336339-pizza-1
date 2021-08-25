import { SAUCES } from "@/common/constants";

const sauceToClientAdapter = (sauce) => {
  return {
    ...sauce,
    value: sauce.id ? SAUCES[sauce.id] : "",
    isChecked: sauce.id === 1,
  };
};

export default sauceToClientAdapter;
