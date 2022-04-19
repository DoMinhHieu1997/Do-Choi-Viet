import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"http://localhost:5001"
});

axiosInstance.interceptors.request.use((config) => {
    return {
        ...config,
        headers: {
            Authorization: "",
        }
    }
});

axiosInstance.interceptors.response.use(() => {
    console.log("http request ended");
});

export default axiosInstance;