import { Dimensions, PixelRatio, Platform } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Basado en el diseño estándar de iPhone 14 (390x844)
const DESIGN_WIDTH = 390;
const DESIGN_HEIGHT = 844;

// Funciones de escalado
const widthScale = (size: number) => (SCREEN_WIDTH / DESIGN_WIDTH) * size;
const heightScale = (size: number) => (SCREEN_HEIGHT / DESIGN_HEIGHT) * size;
const fontScale = (size: number) => size * PixelRatio.getFontScale();

export const sizes = {
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
  padding: widthScale(20), // equivalente a responsiveWidth(5)
  paddingxs: widthScale(8), // equivalente a responsiveWidth(2)
  cardWidth: widthScale(351), // equivalente a responsiveWidth(90)
  cardHeight: heightScale(169), // equivalente a responsiveHeight(20)
  fontSizeLarge: fontScale(16), // ajustado para equivalencia
  fontSizeXL: fontScale(65), // ajustado para equivalencia
  alertButtonWidth: widthScale(351), // responsiveWidth(90)
  alertButtonHeight: heightScale(84.4), // responsiveHeight(10)
  rondedAlert: widthScale(19.5), // responsiveWidth(5)
  buttonHeight: heightScale(55), // responsiveHeight(8)
  profileWidth: widthScale(78), // responsiveWidth(20)
  profileHeight: heightScale(84.4), // responsiveHeight(10)
  marginBottom: heightScale(10),
  navHeight: heightScale(70),
};
