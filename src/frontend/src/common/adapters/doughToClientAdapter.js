import { DOUGH_TYPES } from "@/common/constants";

const doughToClientAdapter = (dough) => {
  return {
    ...dough,
    value: DOUGH_TYPES.find(({ label }) => dough.name === label)?.value,
    isChecked: dough.name === "Тонкое",
  };
};

export default doughToClientAdapter;
