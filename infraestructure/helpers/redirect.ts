import * as Linking from "expo-linking";
import config from "../config/config";

export const redirect = (tokenfcm: string): (() => void) => {
  return () => {
    const appUrl = Linking.createURL("/", { scheme: "aplicacion" });

    Linking.openURL(
      `${config.host}/v1/api/auth/google/?appurl=${appUrl}&tokenFCM=${tokenfcm}`
    );
  };
};

// import * as Linking from "expo-linking";
// import * as WebBrowser from "expo-web-browser"; // Importar expo-web-browser
// import config from "../config/config";

// export const redirect = (tokenfcm: string): (() => void) => {
//   return async () => {
//     const appUrl = Linking.createURL("/", { scheme: "aplicacion" });

//     const authUrl = `${config.host}/v1/api/auth/google/?appurl=${appUrl}&tokenFCM=${tokenfcm}`;

//     await WebBrowser.openBrowserAsync(authUrl);
//   };
// };
