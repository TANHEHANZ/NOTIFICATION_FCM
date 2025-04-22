import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";
import useFetch from "../../../infraestructure/lib/useFetch/useFetch";

export default function ContactDetail() {
  const { id } = useLocalSearchParams() as { id: string };
  const { fetchData } = useFetch();
  console.log("ID del contacto:", id);

  const { data } = fetchData(`GET /v1/api/contact/byuser`, {
    params: { id },
  });

  console.log("Datos del contacto:", data);

  if (!data || data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Cargando o no se encontró el contacto...
        </Text>
      </View>
    );
  }

  const contact = data.contactUser; // Extraemos la información del contacto

  return (
    <View style={styles.container}>
      <Image source={{ uri: contact.photo }} style={styles.photo} />
      <Text style={styles.name}>{contact.name}</Text>
      <Text style={styles.email}>{contact.email}</Text>
      <Text style={styles.state}>Estado: {contact.state}</Text>
      <Text style={styles.role}>Rol: {contact.role}</Text>
      <Text style={styles.provider}>
        Proveedor: {contact.providerType} ({contact.providerId})
      </Text>

      <Text style={styles.date}>
        Creado el: {new Date(contact.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  state: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  role: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  provider: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: "#999",
    marginTop: 10,
  },
  message: {
    fontSize: 16,
    color: "#999",
  },
});
