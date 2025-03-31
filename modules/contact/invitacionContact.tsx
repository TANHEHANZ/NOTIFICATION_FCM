import { Pressable, Share, StyleSheet, Text, View } from "react-native";
import { theme } from "../../shared/components/styles/global";
import { useEffect, useState } from "react";
import * as Linking from "expo-linking";

interface propsInvitacion {
  hideModal: () => void;
  providerId: string;
}

export default function Invitacion({ hideModal, providerId }: propsInvitacion) {
  const [backendUrl, setBackendUrl] = useState("");

  const appUrl = Linking.createURL("/public/contactos");
  const getData = async () => {
    if (providerId) {
      const redirect = appUrl + "?Nick=" + providerId;
      const url = `https://munaykiv3.vercel.app/v1/api/contact/invitacion?redirect=${encodeURIComponent(
        redirect
      )}`;
      setBackendUrl(url);
    }
  };
  useEffect(() => {
    getData();

    return () => {
      getData();
    };
  }, []);

  const shareLink = async () => {
    try {
      await Share.share({
        message: `Enlace para contacto: ${backendUrl}`,
      });
    } catch (error) {
      alert("Error al compartir el enlace.");
    }
  };

  return (
    <View>
      <Text>Invitacion </Text>
      <Pressable
        style={styles.modalButton}
        onPress={() => {
          shareLink();
        }}
      >
        <Text style={styles.modalButtonText}>Guardar</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  modalButton: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
