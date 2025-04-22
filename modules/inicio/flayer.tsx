import {
  StyleSheet,
  View,
  Image,
  FlatList,
  Dimensions,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import useFetch from "../../infraestructure/lib/useFetch/useFetch";
import { sizes, theme } from "../../shared/components/styles/global";

const { width } = Dimensions.get("window");

export default function Flayer() {
  const { fetchData } = useFetch();
  const { data } = fetchData("GET /v1/api/dashboard/flayer") || { data: [] };

  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (data && data.length > 0) {
        const nextIndex = (currentIndex + 1) % data.length;
        setCurrentIndex(nextIndex);
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [currentIndex, data]);
  if (!data || data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No se publicaron recursos</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.resource }} style={styles.image} />
            <LinearGradient
              colors={["transparent", theme.colors.secondary]}
              style={styles.gradient}
            />
            <Text style={styles.title}>RECURSO: {item.title} </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    width: sizes.screenWidth - 40,
    height: sizes.screenHeight / 3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
  },
  container: {
    width: sizes.screenWidth - 40,
    height: sizes.screenHeight / 3,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    overflow: "hidden",
  },
  imageContainer: {
    width: width - 40,
    height: "100%",
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  gradient: {
    position: "absolute",
    width: "100%",
    height: "50%",
    bottom: 0,
  },
  title: {
    position: "absolute",
    bottom: 10,
    left: 10,
    color: "#fff",
    fontSize: 14,
  },
});
