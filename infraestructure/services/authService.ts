import AsyncStorage from "@react-native-async-storage/async-storage";

import { router } from "expo-router";
import { AUTH_TOKEN } from "../constants/const";

export const authService = {
  async saveToken(token: string): Promise<void> {
    await AsyncStorage.setItem(AUTH_TOKEN, token);
  },

  async getToken(): Promise<string | null> {
    const token = await AsyncStorage.getItem(AUTH_TOKEN);
    console.log(token);

    return token;
  },

  async removeToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(AUTH_TOKEN);

      router.push("/login");
    } catch (error) {
      console.error("Error al eliminar el token:", error);
    }
  },

  async isAuthenticated(): Promise<boolean> {
    const token = await AsyncStorage.getItem(AUTH_TOKEN);
    return !!token;
  },
  async saveParams(key: string, params: any): Promise<void> {
    await AsyncStorage.setItem(key, params);
  },
};
