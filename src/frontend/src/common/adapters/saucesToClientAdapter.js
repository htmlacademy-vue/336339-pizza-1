import { SAUCES } from "@/common/constants";

const saucesToClientAdapter = (sauces = []) => {
  return sauces.reduce((accumulator, sauce) => {
    accumulator[sauce.id] = {
      ...sauce,
      value: sauce.id ? SAUCES[sauce.id] : "",
    };
    return accumulator;
  }, {});
};

export default saucesToClientAdapter;
