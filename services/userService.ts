import api from "./api";

export const getProfile = async () => {
  try {
    const response = await api.get("/profile");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch profile");
  }
};
