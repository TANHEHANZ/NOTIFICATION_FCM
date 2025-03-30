import { View, StyleSheet, TouchableOpacity } from "react-native";
import { sizes, theme } from "./styles/global";
import Icon from "../ui/icon";
import { router, usePathname } from "expo-router";
import { ROUTES } from "../../infraestructure/models/enums/routes.enum";

export default function Nav() {
  const pathname = usePathname();
  const navItems = [
    {
      name: "Inicio",
      route: ROUTES.HOME,
      icon: { name: "home", type: "Feather" },
    },
    {
      name: "Alertas",
      route: ROUTES.ALERT,
      icon: { name: "bell", type: "Feather" },
    },
    {
      name: "Contactos",
      route: ROUTES.CONTACT,
      icon: { name: "users", type: "Feather" },
    },
    {
      name: "Configuración",
      route: ROUTES.SETTINGS,
      icon: { name: "settings", type: "Feather" },
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        {navItems.map((item) => (
          <TouchableOpacity
            key={item.name}
            onPress={() => router.push(item.route)}
            style={[
              styles.navItem,
              pathname === item.route && styles.activeItem,
            ]}
          >
            <View style={[styles.iconContainer]}>
              <Icon
                type={item.icon.type as any}
                name={item.icon.name}
                size={24}
                color={
                  pathname === item.route
                    ? theme.colors.primary
                    : theme.colors.background
                }
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  nav: {
    flexDirection: "row",
    backgroundColor: theme.colors.text,
    paddingHorizontal: sizes.padding,
    width: sizes.screenWidth - 40,
    height: sizes.navHeight,
    borderRadius: 999,
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: sizes.marginBottom,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  navItem: {
    padding: 8,
    borderRadius: 20,
  },
  alertItem: {
    position: "relative",
    top: -15,
  },
  activeItem: {
    backgroundColor: theme.colors.primary + "20",
  },

  iconContainer: {
    padding: 8,
  },
});
