import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useFetch from "../../../infraestructure/lib/useFetch/useFetch";
import { theme } from "../../../shared/components/styles/global";
import ListContact from "../../../modules/contact/listContact";
import { useModal } from "../../../infraestructure/hooks/useModal";
import Invitacion from "../../../modules/contact/invitacionContact";
import { useEffect } from "react";
import * as Linking from "expo-linking";
import { ContactoDTO } from "../../../infraestructure/models/DTO/contacto.dto";

export default function Contactos() {
  const { fetchData, postData } = useFetch();
  const { showModal, hideModal } = useModal();
  const { data, refetch } = fetchData("GET /v1/api/contact/contact_for_user");
  const postMutation = postData("POST /v1/api/contact");

  const providerId = data?.providerId || "";
  const contacto = data?.contact || [];
  console.log("provider", providerId);
  const handleAddContact = () => {
    showModal(
      <Invitacion hideModal={hideModal} providerId={providerId} />,
      "Agregar Contacto"
    );
  };

  useEffect(() => {
    const subscription = Linking.addEventListener("url", getcontacData);
    return () => {
      subscription.remove();
    };
  }, []);

  const getcontacData = (result: any) => {
    const { url } = result;
    if (url) {
      const params = Linking.parse(url);
      const infocontact = params.queryParams?.Nick as any;

      console.log("trae informacion: ", infocontact);
      if (infocontact) {
        const contactData: ContactoDTO = { contactNick: infocontact };
        postMutation(contactData, {
          onSuccess: (res) => {
            console.log(res);
            refetch();
          },
          onError: (err) => {
            console.error("Error al guardar el contacto:", err);
          },
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

      {contacto.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="people-outline" size={64} color={theme.colors.text} />
          <Text style={styles.emptyText}>No tienes contactos</Text>
          <TouchableOpacity
            style={styles.addContactButton}
            onPress={handleAddContact}
          >
            <Text style={styles.addContactText}>Agregar Contacto</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ListContact />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
  emptyText: {
    fontSize: 18,
    color: theme.colors.text,
    marginVertical: 16,
  },

  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    zIndex: 10,
  },
  addContactButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
  },
  addContactText: {
    color: "white",
    fontWeight: "bold",
  },
});
