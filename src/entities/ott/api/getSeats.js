import { axiosInstance } from 'entities/axiosInstance';

export const getSeats = async (otts, start, end) => {
  try {
    let url = '/ott/available?';
    url += `start=${start.toISOString().slice(0, 19)}`;
    url += `&end=${end.toISOString().slice(0, 19)}`;

    if (otts.length != 0) {
      for (const ott of otts) {
        url += `&ott=${ott.id}_${ott.profiles.map((profile) => profile.id).join('-')}`;
      }
    }

    const response = await axiosInstance.get(url, { withCredentials: true });

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch seats');
  }
};
