import { useEffect } from "react";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN } from "../constants/const";
import { ROUTES } from "../models/enums/routes.enum";
import { router } from "expo-router";

const useLinkingListener = () => {
  useEffect(() => {
    const subscription = Linking.addEventListener(
      "url",
      async (result: any) => {
        const { url } = result;
        if (url) {
          const params = Linking.parse(url);
          if (
            params.queryParams &&
            typeof params.queryParams.token === "string"
          ) {
            await AsyncStorage.setItem(AUTH_TOKEN, params.queryParams.token);
            const token = await AsyncStorage.getItem(AUTH_TOKEN);
            if (token) {
              console.log("Token guardado en AsyncStorage", token);
              router.push("/public/inicio");
            } else {
              console.log("No se pudo guardar el token en AsyncStorage");
              router.push(ROUTES.BASE);
            }
          }
        }
      }
    );
    return () => {
      subscription.remove();
    };
  }, []);
};

export default useLinkingListener;
