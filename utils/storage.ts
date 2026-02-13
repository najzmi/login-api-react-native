import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveTokens = async (
  accessToken: string,
  refreshToken: string
) => {
  try {
    await AsyncStorage.setItem("access_token", accessToken);
    await AsyncStorage.setItem("refresh_token", refreshToken);
  } catch (error) {
    console.log("Error saving tokens", error);
  }
};

export const getAccessToken = async () => {
  return await AsyncStorage.getItem("access_token");
};

export const removeTokens = async () => {
  await AsyncStorage.multiRemove(["access_token", "refresh_token"]);
};

export const getRefreshToken = async () => {
  return await AsyncStorage.getItem("refresh_token");
};
