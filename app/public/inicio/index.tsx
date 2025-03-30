import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, FlatList, StyleSheet } from "react-native";
import { AUTH_TOKEN } from "../../../infraestructure/constants/const";
import { contact } from "../../../infraestructure/models/globals/contactos";
import Profile from "../../../modules/user/profile";

export default function Inicio() {
  const verificacion = async () => {
    const token = await AsyncStorage.getItem(AUTH_TOKEN);
    console.log(token);
  };

  verificacion();

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
      <FlatList
        data={contactos}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Profile contacto={item} />
          </View>
        )}
        keyExtractor={(item) => item.userId}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
  },
});
