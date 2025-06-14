// utils/dateUtils.ts
export const addSpaceToPascalCase = (str: string): string => {
  return str.replace(/([a-z])([A-Z])/g, "$1 $2");
};
