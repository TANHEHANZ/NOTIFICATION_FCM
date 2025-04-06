import { useEffect } from "react";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN, USER_ROL } from "../constants/const";
import { ROUTES } from "../models/enums/routes.enum";
import { router } from "expo-router";
import { decodeToken } from "../helpers/jwt";

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
            const decoded = decodeToken(token!);
            const role = await AsyncStorage.getItem(USER_ROL);
            if (token && role) {
              const route =
                decoded?.role === "ADMINISTRADOR"
                  ? "/(private)/admin-dashboard"
                  : "/(public)/inicio";
              console.log("Token guardado en AsyncStorage", token);
              console.log("Role guardado en AsyncStorage", role);

              router.replace(route);
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
