import { axiosInstance } from 'entities/axiosInstance';

export const getOtts = async () => {
  try {
    const response = await axiosInstance.get('/ott', {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch seats');
  }
};
