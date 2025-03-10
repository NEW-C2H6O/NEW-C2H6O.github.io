import { convertDateToString } from "shared";
import { axiosInstance } from 'entities/axiosInstance';

async function postReservation({ ottId, profileId, startTime, endTime }) {
  try {
    const response = await axiosInstance.post(
      '/reservations',
      {
        ottId,
        profileId,
        time: {
          start: convertDateToString(startTime),
          end: convertDateToString(endTime),
        },
      },
      {
        withCredentials: true,
      }
    );

    return true;
  } catch (error) {
    switch (error.response.data.status) {
      case 409:
        return false;
      default:
        throw error;
    }
  }
}

export { postReservation };
