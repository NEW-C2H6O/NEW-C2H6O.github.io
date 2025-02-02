import axios from 'axios';

export const getSeats = async (ott, start, end) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/ott/available?start=${start}&end=${end}`;
    if (ott !== null) {
      url += `ott=${ott.ottId}_${ott.value}`;
    }
    const response = await axios.get(url, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch seats');
  }
};
