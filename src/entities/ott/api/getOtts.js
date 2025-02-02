import axios from 'axios';

export const getOtts = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/ott`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch seats');
  }
};
