import React, { useEffect } from "react";
import { Alert, Platform, PermissionsAndroid, View, Text } from "react-native";
import messaging from "@react-native-firebase/messaging";

// Solicitar permisos para notificaciones en Android (API 33+)
async function requestAndroidPermission() {
  if (Platform.OS === "android" && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Permiso de notificaciones concedido");
    } else {
      console.log("Permiso de notificaciones denegado");
    }
  }
}

// Solicitar permisos para notificaciones en iOS
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Estado de autorización:", authStatus);
  }
}

// Obtener y mostrar el token FCM
async function getFCMToken() {
  const token = await messaging().getToken();
  console.log("Token FCM:", token);
  // Aquí deberías enviar este token a tu servidor para registrar el dispositivo
}

const App = () => {
  useEffect(() => {
    // Solicitar permisos según la plataforma
    if (Platform.OS === "android") {
      requestAndroidPermission();
    } else {
      requestUserPermission();
    }

    // Obtener el token FCM
    getFCMToken();

    // Manejar notificaciones en primer plano
    const unsubscribeOnMessage = messaging().onMessage(
      async (remoteMessage) => {
        Alert.alert("¡Nueva notificación!", JSON.stringify(remoteMessage));
      }
    );

    // Manejar notificaciones cuando la aplicación está en segundo plano y el usuario la abre
    const unsubscribeOnNotificationOpenedApp =
      messaging().onNotificationOpenedApp((remoteMessage) => {
        console.log("Notificación causó la apertura de la app:", remoteMessage);
        // Aquí puedes navegar a una pantalla específica según la notificación
      });

    // Manejar notificaciones cuando la aplicación está cerrada y el usuario la abre
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notificación que abrió la aplicación desde estado cerrado:",
            remoteMessage
          );
          // Aquí puedes navegar a una pantalla específica según la notificación
        }
      });

    // Limpiar suscripciones al desmontar el componente
    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpenedApp();
    };
  }, []);

  return (
    <View>
      <Text>Aplicación con Notificaciones Push</Text>
    </View>
  );
};

export default App;
