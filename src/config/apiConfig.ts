import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_APP_API_ENDPOINT;
const jwt = localStorage.getItem("authToken");
export const apiConfig = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${jwt}`,
    "Content-Type": "application/json",
  },
});

// 🔹 Always get the latest JWT from localStorage before each request
apiConfig.interceptors.request.use(
  (config) => {
    const jwt = localStorage.getItem("authToken");
    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    } else {
    }
    return config;
  },
  (error) => Promise.reject(error)
);
