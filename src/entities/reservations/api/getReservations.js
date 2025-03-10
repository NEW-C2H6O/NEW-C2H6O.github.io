import { OTT_ID, OTT_PLATFORMS, OTT_PROFILE_ID, SORT_OPTIONS } from "shared";
import { axiosInstance } from 'entities/axiosInstance';

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
};

const getOttParam = (filter) => {
  if (filter.ottPlatforms.length === 0) return null;

  if (filter.ottPlatforms.length > 1)
    return filter.ottPlatforms.map((v) => OTT_ID[OTT_PLATFORMS[v]]).join(",");

  const ott = OTT_ID[OTT_PLATFORMS[filter.ottPlatforms[0]]];
  const profiles = filter.ottProfiles.map(
    (v) => OTT_PROFILE_ID[OTT_PLATFORMS[filter.ottPlatforms[0]]][v]
  );

  return `${ott}_${profiles.join("-")}`;
};

const getDateParam = (date) => {
  const year = date.year;
  const month = String(date.month).padStart(2, "0");
  const day = String(date.date).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

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
    ...(cursor && { cursor: cursor }),
  });
};

const getReservations = async (filter, date, cursor) => {
  const params = getParams(filter, date, cursor);
  try {
    const result = await axiosInstance.get(`/reservations?${params.toString()}`, { withCredentials: true });
    return result.data?.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export { getReservations };
