import axios from "axios";
import api from "./api";

type LoginPayload = {
  email: string;
  password: string;
};

const refreshClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (data: LoginPayload) => {
  try {
    const response = await api.post("/login", data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed");
    }
    throw new Error("Network error. Check your connection.");
  }
};

// Untuk Kebutuhan Refresh Token
export const refreshToken = async (refreshToken: string) => {
  try {
    const response = await refreshClient.post("/refresh", {
      refresh_token: refreshToken,
    });

    return response.data;
  } catch (error: any) {
    throw new Error("Session expired. Please login again.");
  }
};
