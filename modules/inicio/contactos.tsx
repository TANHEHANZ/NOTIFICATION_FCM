import { StyleSheet, Text, View } from "react-native";
import Profile from "../user/profile";
import { contact } from "../../infraestructure/models/globals/contactos";

export default function Contactos() {
  const contactos: contact[] = [
    {
      email: "hantach10@gmail.com",
      name: "hanz Limber tapia choque",
      photo:
        "https://lh3.googleusercontent.com/a/ACg8ocJSj46AYEEZDjM6q2d5fKVtxu-NxdF1DGV06oD-wjsqKbsQpWI=s96-c",
      userId: "asjkhdauhsdahsdh",
    },
    {
      email: "leidy@gmail.com",
      name: "eleonora leidy tapia choque",
      photo:
        "https://lh3.googleusercontent.com/a/ACg8ocJSj46AYEEZDjM6q2d5fKVtxu-NxdF1DGV06oD-wjsqKbsQpWI=s96-c",
      userId: "asjkhdauhsda132131",
    },
  ];

  return (
    <View style={styles.container}>
      {contactos.map((contacto) => (
        <Profile key={contacto.userId} contacto={contacto} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
