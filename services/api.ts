import { getAccessToken, getRefreshToken, removeTokens, saveTokens } from "@/utils/storage";
import axios from "axios";
import { refreshToken as refreshTokenService } from "./authService";

const api = axios.create({
  baseURL: "http://192.168.206.92:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// 🔥 Request Interceptor
api.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🔥 Response Interceptor Refresh Token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const storedRefreshToken = await getRefreshToken();

        if (!storedRefreshToken) {
          throw new Error("No refresh token");
        }

        const newTokens = await refreshTokenService(storedRefreshToken);

        await saveTokens(
          newTokens.access_token,
          newTokens.refresh_token
        );

        originalRequest.headers.Authorization = `Bearer ${newTokens.access_token}`;

        return api(originalRequest);
      } catch (refreshError) {
        await removeTokens();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export default api;
