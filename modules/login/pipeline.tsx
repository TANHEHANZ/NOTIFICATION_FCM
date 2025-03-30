import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../shared/components/styles/global";
import { AlertTap } from "../../shared/ui/AlertTap";
import { loginStyles } from "../../shared/components/styles/login.styles";

export default function LoginPipeline() {
  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
        position: "relative",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <View style={styles.header}>
        <AlertTap
          count={12}
          label="Alertas"
          iconType="Ionicons"
          iconName="notifications"
          color={theme.colors.lila}
          rotation={-5}
          position="center"
          offsetY={90}
        />

        <AlertTap
          count={20}
          label="Contactos"
          iconType="FontAwesome"
          iconName="users"
          color={theme.colors.yelow}
          rotation={8}
          position="right"
          offsetY={-80}
        />

        <AlertTap
          count={5}
          label="Emergencias"
          iconType="MaterialIcons"
          iconName="emergency"
          color={theme.colors.basico}
          rotation={5}
          position="left"
          offsetY={10}
        />
        <AlertTap
          count={10}
          label="Recursos"
          iconType="Ionicons"
          iconName="book"
          color={theme.colors.accent}
          rotation={-10}
          position="left"
          offsetY={-100}
        />
      </View>
      <View>
        <Text style={loginStyles.title}>
          Munayki{" "}
          <Text style={{ color: theme.colors.primary }}>yo te cuido</Text>
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "50%",
    position: "absolute",
    top: 0,
    backgroundColor: theme.colors.importart,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
});
