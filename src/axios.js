import axios from "axios";

const domain = "https://do-choi-viet.herokuapp.com/"; //"http://localhost:5001"

const axiosInstance = axios.create({
    baseURL:domain
});

// axiosInstance.interceptors.request.use((config) => {
//     return {
//         ...config,
//         headers: {
//             Authorization: "",
//         }
//     }
// });

// axiosInstance.interceptors.response.use(() => {
//     console.log("http request ended");
// });

export default axiosInstance;