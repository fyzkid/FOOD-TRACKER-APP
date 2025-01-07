export const daysBetween = (date1, date2) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const diff = Math.abs(date1 - date2);

  return Math.round(diff / oneDay);
};
