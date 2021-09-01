import { DOUGH_TYPES } from "@/common/constants";

const doughToClientAdapter = (dough = []) => {
  return dough.reduce((accumulator, currentItem) => {
    accumulator[currentItem.id] = {
      ...currentItem,
      value: DOUGH_TYPES.find(({ label }) => currentItem.name === label)?.value,
      longLabel: DOUGH_TYPES.find(({ label }) => currentItem.name === label)
        ?.longLabel,
    };
    return accumulator;
  }, {});
};

export default doughToClientAdapter;
