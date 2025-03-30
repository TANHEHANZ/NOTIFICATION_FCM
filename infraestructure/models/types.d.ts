import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Public: { screen: string };
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Public"
>;
