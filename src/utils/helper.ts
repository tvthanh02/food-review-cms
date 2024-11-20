export const CapitalizeFirstLetter = (str: string) => {
  str = str.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getUrlImageFromFile = (file: File): string => {
  if (!file) return '';
  return URL.createObjectURL(file);
};

export const revokeUrl = (url: string) => {
  URL.revokeObjectURL(url);
};
