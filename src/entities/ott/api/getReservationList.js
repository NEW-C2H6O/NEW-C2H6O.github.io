import { axiosInstance } from 'entities/axiosInstance';

async function getReservationList({ ottId, profileId, date }) {
  try {
    const response = await axiosInstance.get(
      `/ott/${ottId}/${profileId}/reservations?date=${date}`,
      {
        withCredentials: true,
      }
    );

    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch seats");
  }
}

export { getReservationList };
