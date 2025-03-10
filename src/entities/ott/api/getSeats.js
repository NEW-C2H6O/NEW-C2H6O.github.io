import { axiosInstance } from "entities/axiosInstance";
import { getTimeParam } from "shared";

export const getSeats = async (otts, start, end) => {
  try {
    let url = "/ott/available?";

    console.log(typeof start, end);
    console.log(start.toISOString(), end.toISOString());
    url += `start=${getTimeParam(start)}`;
    url += `&end=${getTimeParam(end)}`;

    if (otts.length != 0) {
      for (const ott of otts) {
        url += `&ott=${ott.id}_${ott.profiles.map((profile) => profile.id).join("-")}`;
      }
    }

    const response = await axiosInstance.get(url, { withCredentials: true });

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch seats");
  }
};
