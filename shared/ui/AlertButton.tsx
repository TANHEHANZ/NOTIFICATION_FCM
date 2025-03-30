import React from "react";
import { View, ViewStyle } from "react-native";
import { theme } from "../components/styles/global";

type AlertButtonStatus = "normal" | "progress" | "completed";

interface AlertButtonProps {
  status?: AlertButtonStatus;
  size?: number;
  style?: ViewStyle;
  waveCount?: number;
  maxWaveScale?: number;
  minOpacity?: number;
  maxOpacity?: number;
}

const AlertButton: React.FC<AlertButtonProps> = ({
  status = "normal",
  size = 100,
  style,
  waveCount = 5,
  maxWaveScale = 1.8,
  minOpacity = 0.1,
  maxOpacity = 0.6,
}) => {
  const getColor = () => {
    switch (status) {
      case "progress":
        return theme.colors.accent;
      case "completed":
        return theme.colors.primary;
      default:
        return theme.colors.secondary;
    }
  };

  const renderWaves = () => {
    const waves: any = [];
    const buttonSize = size + 40;

    const waveSizes = Array.from({ length: waveCount }, (_, i) => {
      const scale = 1 + (maxWaveScale - 1) * (i / (waveCount - 1));
      return buttonSize * scale;
    }).reverse();

    const opacities = Array.from({ length: waveCount }, (_, i) => {
      return minOpacity + (maxOpacity - minOpacity) * (i / (waveCount - 1));
    }).reverse();

    waveSizes.forEach((waveSize, index) => {
      waves.push(
        <View
          key={`wave-${index}`}
          style={{
            position: "absolute",
            width: waveSize,
            height: waveSize,
            borderRadius: waveSize / 2,
            backgroundColor: buttonColor,
            opacity: opacities[index],
            zIndex: -index - 1,
          }}
        />
      );
    });
    return waves;
  };

  const buttonColor = getColor();
  const buttonSize = size + 40;

  return (
    <View
      style={[
        {
          width: size * 3.5,
          height: size * 3.5,
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        },
        style,
      ]}
    >
      {renderWaves()}

      <View
        style={{
          width: buttonSize,
          height: buttonSize,
          borderRadius: buttonSize / 2,
          backgroundColor: buttonColor,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: buttonColor,
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.4,
          shadowRadius: 20,
          elevation: 10,
          zIndex: 10,
        }}
      >
        {/* Icono o contenido interno */}
      </View>
    </View>
  );
};

export default AlertButton;
