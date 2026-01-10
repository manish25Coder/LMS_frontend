import axios from "axios";

// const BASE_URL = "http://localhost:5003/api/v1"
// const BASE_URL = "http://localhost:8080/api/v1"
const BASE_URL = import.meta.env.VITE_API_URL
// const BASE_URL = "https://lms-backend-1-w5u3.onrender.com/api/v1"
const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
