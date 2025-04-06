import { View } from "react-native";
import ButtonPrimary from "../../shared/ui/button";
import { loginStyles } from "../../shared/components/styles/login.styles";
import LoginPipeline from "../../modules/login/pipeline";
import { StatusBar } from "expo-status-bar";
import useLinkingListener from "../../infraestructure/hooks/useLinkingListener";
import { redirect } from "../../infraestructure/helpers/redirect";
interface LoginProps {
  fcmToken: string | null;
}

export default function Login({ fcmToken }: LoginProps) {
  useLinkingListener();

  return (
    <View style={loginStyles.container}>
      <StatusBar style="light" backgroundColor="#000000" translucent={false} />
      <LoginPipeline />
      <ButtonPrimary
        title="Iniciar sesión"
        variant="primary"
        size="large"
        icon="google"
        iconType="AntDesign"
        onPress={redirect(fcmToken!)}
      />
    </View>
  );
}
