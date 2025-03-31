import { FlatList, StyleSheet, View } from "react-native";
import Profile from "../user/profile";
import { sizes } from "../../shared/components/styles/global";

import CardInicio from "./cardInicio";
import useFetch from "../../infraestructure/lib/useFetch/useFetch";

export default function Contactos() {
  const { fetchData, postData } = useFetch();
  const { data } = fetchData("GET /v1/api/contact");
  console.log("contactos", data);

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
          data={data}
          renderItem={({ item }) => <Profile contacto={item.contactUser} />}
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
