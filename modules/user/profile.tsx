import { Text, View, Image, StyleSheet } from "react-native";
import {
  contact,
  UserByContact,
} from "../../infraestructure/models/globals/contactos";
import { theme } from "../../shared/components/styles/global";

export default function Profile({ contacto }: { contacto: UserByContact }) {
  const [firstWord, secondWord] = contacto.name.split(" ");

  return (
    <View style={styles.container}>
      {contacto.photo && (
        <Image source={{ uri: contacto.photo }} style={styles.profileImage} />
      )}

      <View style={styles.nameContainer}>
        <Text style={styles.name}>{firstWord}</Text>
        {secondWord && <Text style={styles.name}>{secondWord}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  profileImage: {
    width: 65,
    height: 65,
    borderRadius: 99,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: theme.colors.background,
  },
  nameContainer: {
    alignItems: "center",
  },
  name: {
    fontSize: 14,
    marginBottom: 4,
  },
});
