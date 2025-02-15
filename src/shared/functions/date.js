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

/**
 * convert time to Reservation Table Index
 * @param {Date} date 날짜
 */
const timeToReservationIdx = (date) => {
  const hour = date.getHours();
  const minute = date.getMinutes();
  return hour * 6 + parseInt(minute / 10);
};

/**
 * convert Reservation Table Index to Time
 * @param {Date} date 날짜
 * @param {number} index 인덱스
 */
const reservationIdxToTime = (date, index) => {
  const hour = parseInt(index / 6);
  const minute = (10 * index) % 6;
  const newDate = new Date(date);
  newDate.setHours(hour);
  newDate.setMinutes(minute);

  return newDate;
};

export { getDateParam, timeToReservationIdx, reservationIdxToTime };
