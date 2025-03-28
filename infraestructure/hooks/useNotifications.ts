import { useEffect, useState } from "react";
import messaging from "@react-native-firebase/messaging";
import { Alert, Platform, PermissionsAndroid } from "react-native";

export const useNotifications = () => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const requestAndroidPermission = async () => {
    if (Platform.OS === "android" && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      setPermissionGranted(granted === PermissionsAndroid.RESULTS.GRANTED);
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const requestIOSPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    setPermissionGranted(enabled);
    return enabled;
  };

  const getFCMToken = async () => {
    const token = await messaging().getToken();
    setFcmToken(token);
    return token;
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
