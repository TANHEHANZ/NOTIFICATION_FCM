import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import { Nav } from "../../shared";

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="#fff" translucent={false} />

      <Text>Header común a toda la app</Text>
      <Slot />
      <Nav></Nav>
    </View>
  );
}
