import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import config from "../config/config";

export const redirect = (tokenfcm: string): (() => void) => {
  return async () => {
    const appUrl = Linking.createURL("/");

    const authUrl = `${config.host}/v1/api/auth/google/?appurl=${appUrl}&tokenFCM=${tokenfcm}`;

    await WebBrowser.openBrowserAsync(authUrl);
  };
};
