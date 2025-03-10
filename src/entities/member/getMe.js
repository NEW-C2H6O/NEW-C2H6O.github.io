import { axiosInstance } from "../axiosInstance.js";

export const getMe = async () => {

  try {  
    const response = await axiosInstance.get('/members/me', {
      withCredentials: true,
    });
    return response.data.data;
  } catch(e) {
    console.log("error occured: ", e);
    return null;
  }
};
