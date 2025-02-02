import axios from 'axios';

export const getSeats = async (ott, start, end) => {
  try {
    let url = `${process.env.REACT_APP_API_URL}/ott/available?`;
    
    url += `start=${start.toISOString().slice(0, 19)}`;
    url += `&end=${end.toISOString().slice(0, 19)}`;
    
    if (ott !== null) {
      url += `&ott=${ott.ott}_${ott.value}`;
    }

    const response = await axios.get(url, { withCredentials: true });

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch seats');
  }
};
