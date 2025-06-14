// utils/dateUtils.ts
export const getCurrentMonth = (oneBased: boolean = true): number => {
  const currentDate = new Date();
  const month = currentDate.getMonth(); // 0-based month (0 = January)
  return oneBased ? month + 1 : month;
};
