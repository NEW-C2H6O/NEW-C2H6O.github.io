import { axiosInstance } from 'entities/axiosInstance';

const deleteReservation = async (reservationId) => {
  try {
    await axiosInstance.delete(
      `/reservations/${reservationId}`, 
      { withCredentials: true }
    );
  } catch (error) {
    console.error(error);
  }
}

export { deleteReservation };