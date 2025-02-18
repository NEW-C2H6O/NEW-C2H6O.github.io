import { SORT_OPTIONS } from "shared";

import axios from "axios";

const getSortParam = (idx) => {
  const sortOption = SORT_OPTIONS[idx];

  if (sortOption === "시간순") {
    return "startTime,asc";
  } else if (sortOption === "이름순") {
    return "member,asc";
  } else if (sortOption === "플랫폼순") {
    return "ottName,asc";
  }

  return "reservationId,asc";
}

const getOttParam = (filter) => {
  if (filter.ottPlatforms.length === 0) {
    return null;
  }

  const otts = filter.ottPlatforms.map(value => value + 1);
  const profiles = filter.ottProfiles.map(value => value + 1);

  if (otts.length >= 2) {
    return otts.join(",");
  }

  return `${otts[0]}_${profiles.join("-")}`;
}

const getDateParam = (date) => {
  const year = date.year
  const month = String(date.month).padStart(2, '0')
  const day = String(date.date).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

const getParams = (filter, date, cursor) => {
  const sortParam = getSortParam(filter.sortOption);
  const ottParam = getOttParam(filter);
  const dateParam = getDateParam(date);

  return new URLSearchParams({
    mine: filter.myOnly,
    upcoming: false,
    date: dateParam,
    ...(sortParam && { sort: sortParam }),
    ...(ottParam && { ott: ottParam }),
    ...(cursor && { cursor: cursor })
  });
}

const getReservations = async (filter, date, cursor) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const url = `${API_URL}/reservations`;
  const params = getParams(filter, date, cursor);
  try {
    const result = await axios.get(`${url}?${params.toString()}`, { withCredentials: true });
    return result.data?.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export { getReservations };