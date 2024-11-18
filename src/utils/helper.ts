export const CapitalizeFirstLetter = (str: string) => {
  str = str.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
};
