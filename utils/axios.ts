import { IUser } from "@/app/interface";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important: sends cookies with requests
});

// Request interceptor - adds token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from cookie using js-cookie
    const user: IUser = JSON.parse(`${localStorage.getItem("swiftuser")}`);
    const token = user.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor - handles token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("swiftuser");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
