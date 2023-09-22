import originAxios from "axios";
import { AuthService } from "./AuthService";

export const axios = originAxios.create({
  baseURL: "http://localhost:3000", // Замените на свой базовый URL
  withCredentials: true,
});

axios.interceptors.request.use(
  (config) => {
    if (config.url === "/auth/signinUser" || config.url === "/auth/signupUser") {
      return config;
    }

    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const { accessToken } = await AuthService.refreshTokens();
        localStorage.setItem("access_token", accessToken);

        return axios.request(originalRequest);
      } catch (e) {
        localStorage.removeItem("access_token");
        console.log("No authorized");
      }
    }
    throw error;
  }
);
