import axios from 'axios';

export const getMe = async () => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/members/me`;

    const response = await axios.get(url, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch seats');
  }
};
