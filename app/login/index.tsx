import { View, Text } from "react-native";
import ButtonPrimary from "../../shared/ui/button";

export default function Login() {
  const handleGoogleLogin = () => {
    console.log("se pulso");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Login componente</Text>
      <Text>Iniciar secion con Google</Text>

      <ButtonPrimary
        title="Iniciar sesión con Google"
        icon="google"
        iconType="AntDesign"
        variant="primary"
        onPress={handleGoogleLogin}
      />

      <ButtonPrimary
        title="Continuar con Google"
        icon="google"
        iconType="AntDesign"
        variant="outline"
        iconPosition="right"
        onPress={handleGoogleLogin}
      />

      <ButtonPrimary
        title="Google"
        icon="google"
        iconType="AntDesign"
        variant="secondary"
        onPress={handleGoogleLogin}
      />
    </View>
  );
}
