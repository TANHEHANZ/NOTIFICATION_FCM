export enum ROUTES {
  BASE = "/",
  LOGIN = "/login",
  BASE_PUBLIC = "/public",
  HOME = BASE_PUBLIC + "/inicio",
  ALERT = BASE_PUBLIC + "/alertas",
  CONTACT = BASE_PUBLIC + "/contactos",
  CONFIGURATION = BASE_PUBLIC + "/configuracion",
  PROFILE = BASE_PUBLIC + "/perfil",
  SETTINGS = BASE_PUBLIC + "/configuracion",
  NOTIFICATIONS = BASE_PUBLIC + "/notificaciones",
}
export enum PRIVATE_ROUTES {
  BASE = "/private",
  ALERTS = BASE + "/alertas",
  MAPS = BASE + "/mapas",
  PROFILE = BASE + "/perfil",
}
