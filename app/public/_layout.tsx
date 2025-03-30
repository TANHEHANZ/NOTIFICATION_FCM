import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Header, Nav } from "../../shared";
import { theme } from "../../shared/components/styles/global";

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar style="light" backgroundColor="#fff" translucent={false} />
      <Header />
      <Slot />
      <Nav />
    </View>
  );
}
