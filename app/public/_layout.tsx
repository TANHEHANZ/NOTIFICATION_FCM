import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Header, Nav } from "../../shared";
import { theme } from "../../shared/components/styles/global";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
export default function RootLayout() {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        const e = error as Error;
        console.log(e.message);
      },
    }),
    defaultOptions: {
      queries: {
        gcTime: 1000 * 60 * 60 * 2,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <StatusBar style="light" backgroundColor="#fff" translucent={false} />
        <Header />
        <Slot />
        <Nav />
      </View>
    </QueryClientProvider>
  );
}
