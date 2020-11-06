export const convertSlug = (str: string, reverse?: boolean) => {
  if (reverse) return str.split('-').join(' ');
  return str.split(' ').join('-');
};
