import { SAUCES } from "@/common/constants";

const saucesToClientAdapter = (sauce) => {
  return {
    ...sauce,
    value: sauce.id ? SAUCES[sauce.id] : "",
    isChecked: sauce.id === 1,
  };
};

export default saucesToClientAdapter;
