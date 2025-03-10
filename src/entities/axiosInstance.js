import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    timeout: 1000,
});

axiosInstance.interceptors.response.use(
    (res) => {
        console.log("res: ", res);
        return res;
    },
    (err) => {
        if (err.response?.status === 401) {
            window.location.href = "/auth";
        }

        window.localStorage.href = "/error";

        return err;
    }
);

