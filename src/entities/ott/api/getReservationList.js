import axios from "axios";

async function getReservationList({ ottId, profileId, date }) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/ott/${ottId}/${profileId}/reservations?date=${date}`,
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
