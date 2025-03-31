// ListContact.tsx
import { FlatList, StyleSheet } from "react-native";
import { CardContact } from "./CardContact";
import useFetch from "../../infraestructure/lib/useFetch/useFetch";

export default function ListContact() {
  const { fetchData, postData } = useFetch();

  const { data, refetch } = fetchData("GET /v1/api/contact");
  console.log(data);
  const onViewContact = (id: string) => {};
  const onDeleteContact = (id: string) => {};
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <CardContact
          contact={item.contactUser}
          onView={() => onViewContact(item.userId)}
          onDelete={() => onDeleteContact(item.userId)}
        />
      )}
      keyExtractor={(item) => item.userId}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
});
