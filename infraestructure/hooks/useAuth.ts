// infraestructure/hooks/useAuth.ts
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN } from "../constants/const";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await AsyncStorage.getItem(AUTH_TOKEN);
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  return { isAuthenticated, isLoading };
};
