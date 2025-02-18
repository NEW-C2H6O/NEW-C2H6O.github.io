import axios from "axios";

const deleteReservation = async (reservationId) => {
  const API_URL = process.env.REACT_APP_API_URL;
  try {
    await axios.delete(
      `${API_URL}/reservations/${reservationId}`, 
      { withCredentials: true }
    );
  } catch (error) {
    console.error(error);
  }
}

export { deleteReservation };