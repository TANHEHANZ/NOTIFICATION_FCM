import * as Linking from "expo-linking";
import config from "../config/config";

export const redirect = (): (() => void) => {
  return () => {
    const appUrl = Linking.createURL("");
    Linking.openURL(`${config.host}/v1/api/auth/google/?appurl=${appUrl}`);
  };
};
