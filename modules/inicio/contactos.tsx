import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Profile from "../user/profile";
import { contact } from "../../infraestructure/models/globals/contactos";
import { AlertTap } from "../../shared/ui/AlertTap";
import { sizes, theme } from "../../shared/components/styles/global";
import { Ionicons } from "@expo/vector-icons";
import CardInicio from "./cardInicio";

export default function Contactos() {
  const contactos: contact[] = [
    {
      email: "contacto1@example.com",
      name: "Juan Pérez",
      photo:
        "https://lh3.googleusercontent.com/a/ACg8ocJSj46AYEEZDjM6q2d5fKVtxu-NxdF1DGV06oD-wjsqKbsQpWI=s96-c",
      userId: "1",
    },
    {
      email: "contacto2@example.com",
      name: "María García",
      photo:
        "https://lh3.googleusercontent.com/a/ACg8ocJSj46AYEEZDjM6q2d5fKVtxu-NxdF1DGV06oD-wjsqKbsQpWI=s96-c",
      userId: "2",
    },
    {
      email: "contacto2@example.com",
      name: "María García",
      photo:
        "https://lh3.googleusercontent.com/a/ACg8ocJSj46AYEEZDjM6q2d5fKVtxu-NxdF1DGV06oD-wjsqKbsQpWI=s96-c",
      userId: "3",
    },
    {
      email: "contacto2@example.com",
      name: "María García",
      photo:
        "https://lh3.googleusercontent.com/a/ACg8ocJSj46AYEEZDjM6q2d5fKVtxu-NxdF1DGV06oD-wjsqKbsQpWI=s96-c",
      userId: "4",
    },
    {
      email: "contacto2@example.com",
      name: "María García",
      photo:
        "https://lh3.googleusercontent.com/a/ACg8ocJSj46AYEEZDjM6q2d5fKVtxu-NxdF1DGV06oD-wjsqKbsQpWI=s96-c",
      userId: "5",
    },
  ];

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardInicio
          title="contactos"
          icon="person-outline"
          value={12}
          important
        />
        <FlatList
          data={contactos}
          renderItem={({ item }) => <Profile contacto={item} />}
          keyExtractor={(item) => item.userId}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: sizes.screenWidth - 40,
    gap: 16,
    marginBottom: 20,
  },
  listContent: {},
});
