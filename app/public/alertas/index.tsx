import React, { useState, useEffect, useRef } from "react";
import { View, Button, Alert, StyleSheet, Pressable, Text } from "react-native";
import { Camera, CameraView } from "expo-camera";
import * as Location from "expo-location";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN } from "../../../infraestructure/constants/const";
import { useNavigation } from "@react-navigation/native";
import { Card } from "../../../shared/ui/Card";
import { sizes, theme } from "../../../shared/components/styles/global";
import RippleButton from "../../../shared/ui/AlertButton";

interface SendData {
  photos: string[];
  audioUri: string;
  location: Location.LocationObject;
  token: string;
}

export default function Alertas() {
  const navigation = useNavigation();
  const cameraRef = useRef<CameraView>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [hasPermissions, setHasPermissions] = useState(false);
  const recordingRef = useRef<Audio.Recording>();

  useEffect(() => {
    return () => {
      // Cleanup audio recording on unmount
      if (recordingRef.current) {
        recordingRef.current.stopAndUnloadAsync();
      }
    };
  }, []);

  const requestPermissions = async () => {
    try {
      const cameraStatus = (await Camera.requestCameraPermissionsAsync())
        .status;
      const { status: audioStatus } = await Audio.requestPermissionsAsync();
      const { status: locationStatus } =
        await Location.requestForegroundPermissionsAsync();

      if (
        cameraStatus !== "granted" ||
        audioStatus !== "granted" ||
        locationStatus !== "granted"
      ) {
        Alert.alert(
          "Permisos necesarios",
          "Debe otorgar permisos de cámara, audio y ubicación para continuar."
        );
        return false;
      }

      setHasPermissions(true);
      return true;
    } catch (error) {
      console.error("Error solicitando permisos:", error);
      Alert.alert(
        "Error",
        "No se pudieron solicitar los permisos correctamente."
      );
      return false;
    }
  };

  const loadToken = async () => {
    const storedToken = await AsyncStorage.getItem(AUTH_TOKEN);
    setToken(storedToken);
  };

  useEffect(() => {
    requestPermissions();
    loadToken();
  }, []);

  const handleEmergencyReport = async () => {
    if (!token) {
      Alert.alert("Error", "No se pudo obtener el token de autenticación");
      return;
    }

    if (!hasPermissions) {
      Alert.alert("Error", "No tienes los permisos necesarios.");
      return;
    }

    setIsProcessing(true);

    try {
      const location = await Location.getCurrentPositionAsync({});
      const photos = [];

      // Capture 3 photos with error handling
      for (let i = 0; i < 3; i++) {
        try {
          if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            if (photo) {
              photos.push(photo.uri);
            }
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
        } catch (photoError) {
          console.error("Error capturando foto:", photoError);
          Alert.alert("Error", "No se pudo capturar una de las fotos");
        }
      }

      // Audio recording
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      recordingRef.current = recording;

      await new Promise((resolve) => setTimeout(resolve, 10000));
      await recording.stopAndUnloadAsync();
      const audioUri = recording.getURI();

      if (!audioUri) {
        throw new Error("No se pudo grabar el audio");
      }

      // Send data to backend
      await sendToBackend({
        photos,
        audioUri,
        location,
        token,
      });

      Alert.alert("Éxito", "Reporte enviado correctamente");
    } catch (error) {
      Alert.alert("Error", "Ocurrió un problema al procesar el reporte");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const sendToBackend = async ({
    photos,
    audioUri,
    location,
    token,
  }: SendData) => {
    const formData = new FormData();

    photos.forEach((uri, index) => {
      formData.append("photos", {
        uri,
        name: `photo_${index}.jpg`,
        type: "image/jpeg",
      } as any);
    });

    formData.append("audio", {
      uri: audioUri,
      name: "audio.m4a",
      type: "audio/m4a",
    } as any);

    formData.append(
      "location",
      JSON.stringify({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      })
    );

    try {
      const response = await fetch(
        "http://192.168.0.5:3000/v1/api/alert/reports",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          Alert.alert("Sesión expirada", "Por favor inicia sesión nuevamente");
          navigation.navigate("Login" as never);
        }
        throw new Error(data.message || "Error en el servidor");
      }

      return data;
    } catch (error) {
      console.error("Error al enviar:", error);
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      {hasPermissions ? (
        <View style={styles.container}>
          <Card>
            <CameraView style={styles.camera} ref={cameraRef} />
          </Card>

          <RippleButton
            onPress={handleEmergencyReport}
            disabled={isProcessing}
            isProcessing={isProcessing}
          >
            <Text style={styles.buttonText}>
              {isProcessing ? "Procesando..." : "Enviar Reporte"}
            </Text>
          </RippleButton>
        </View>
      ) : (
        <View style={styles.permissionContainer}>
          <Button
            title="Solicitar Permisos"
            onPress={requestPermissions}
            accessibilityLabel="Solicitar permisos de cámara, audio y ubicación"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
