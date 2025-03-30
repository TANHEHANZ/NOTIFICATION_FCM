import * as Linking from "expo-linking";
import config from "../config/config";

export const redirect = (tokenfcm: string): (() => void) => {
  return () => {
    const appUrl = Linking.createURL("");

    Linking.openURL(
      `${config.host}/v1/api/auth/google/?appurl=${appUrl}&tokenFCM=${tokenfcm}`
    );
  };
};
