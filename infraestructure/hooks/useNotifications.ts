import { useEffect, useState } from "react";
import messaging from "@react-native-firebase/messaging";
import { Alert, Platform, PermissionsAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKENFCM } from "../constants/const";

export const useNotifications = () => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const requestAndroidPermission = async () => {
    if (Platform.OS === "android" && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      console.log("Android permission granted:", granted);
      setPermissionGranted(granted === PermissionsAndroid.RESULTS.GRANTED);
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    console.log(
      "Android permission not required for version:",
      Platform.Version
    );
    return true;
  };

  const requestIOSPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    console.log("iOS permission status:", authStatus, enabled);
    setPermissionGranted(enabled);
    return enabled;
  };

  const setupNotifications = async () => {
    let hasPermission = false;

    if (Platform.OS === "android") {
      hasPermission = await requestAndroidPermission();
    } else {
      hasPermission = await requestIOSPermission();
    }

    if (hasPermission) {
      await getFCMToken();
    } else {
      console.log("Permission not granted for notifications.");
    }
  };

  const getFCMToken = async () => {
    try {
      let token = await AsyncStorage.getItem(TOKENFCM);
      console.log("Token FCM desde AsyncStorage:", token);
      if (!token) {
        token = await messaging().getToken();
        console.log("Token FCM desde Firebase:", token);
        await AsyncStorage.setItem(TOKENFCM, token);
      }

      setFcmToken(token);
      return token;
    } catch (error) {
      console.error("Error obteniendo el token FCM:", error);
    }
  };

  useEffect(() => {
    setupNotifications();

    const unsubscribeOnMessage = messaging().onMessage(
      async (remoteMessage) => {
        Alert.alert("¡Nueva notificación!", JSON.stringify(remoteMessage));
      }
    );

    const unsubscribeOnNotificationOpenedApp =
      messaging().onNotificationOpenedApp((remoteMessage) => {
        console.log("Notificación causó la apertura de la app:", remoteMessage);
      });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notificación que abrió la aplicación desde estado cerrado:",
            remoteMessage
          );
        }
      });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpenedApp();
    };
  }, []);

  return {
    fcmToken,
    permissionGranted,
    setupNotifications,
  };
};
