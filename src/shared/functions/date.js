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

const getTimeParam = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
};

/**
 * convert date to string
 * @param {Date} date
 * @returns {string} YYYY-MM-DDTHH:mm:ss
 */
const convertDateToString = (date) => {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
    .format(date)
    .replace(",", "")
    .replace(/\//g, "-")
    .replace(" ", "T");
};

/**
 * create date
 * @param {{
 *  year: number,
 *  month: number,
 *  date: number
 * }} date
 */
const createDate = (date) => {
  return new Date(date.year, date.month - 1, date.date);
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
  const minute = 10 * (index % 6);
  const newDate = new Date(date);
  newDate.setHours(hour);
  newDate.setMinutes(minute);

  return newDate;
};

export {
  getDateParam,
  getTimeParam,
  convertDateToString,
  createDate,
  timeToReservationIdx,
  reservationIdxToTime,
};
