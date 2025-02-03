/**
 * convert date object YYYY-MM-DD
 * @param {{
 *  year: number,
 *  month: number,
 *  date: number
 * }} date
 *
 */
const getDateParam = (date) => {
  const year = date.year;
  const month = String(date.month).padStart(2, "0");
  const day = String(date.date).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export { getDateParam };
