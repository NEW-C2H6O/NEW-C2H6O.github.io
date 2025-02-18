import axios from "axios";
import { convertDateToString } from "shared";

async function postReservation({ ottId, profileId, startTime, endTime }) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/reservations`,
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

    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch seats");
  }
}

export { postReservation };
