import React, { useEffect, useRef, useState } from "react";
import {
  Pressable,
  View,
  StyleSheet,
  Animated,
  Easing,
  Text,
} from "react-native";
import { sizes, theme } from "../components/styles/global";

interface RippleButtonProps {
  onPress: () => void;
  disabled?: boolean;
  isProcessing?: boolean;
  children?: React.ReactNode;
}

const RippleButton: React.FC<RippleButtonProps> = ({
  onPress,
  disabled = false,
  isProcessing = false,
  children,
}) => {
  const [ripples, setRipples] = useState<
    {
      id: number;
      scale: Animated.Value;
      opacity: Animated.Value;
      pulse: Animated.Value;
    }[]
  >([]);
  const rippleId = useRef(0);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const rippleInterval = useRef<NodeJS.Timeout>();

  // Efecto de pulso continuo para el botón principal
  useEffect(() => {
    if (isProcessing) {
      const pulseSequence = Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]);

      const opacitySequence = Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.7,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]);

      const pulseLoop = Animated.loop(pulseSequence);
      const opacityLoop = Animated.loop(opacitySequence);

      pulseLoop.start();
      opacityLoop.start();

      return () => {
        pulseLoop.stop();
        opacityLoop.stop();
      };
    } else {
      pulseAnim.setValue(1);
      opacityAnim.setValue(1);
    }
  }, [isProcessing, pulseAnim, opacityAnim]);

  const addRipple = () => {
    if (disabled) return;

    const newRipple = {
      id: rippleId.current++,
      scale: new Animated.Value(0.5),
      opacity: new Animated.Value(1),
      pulse: new Animated.Value(0),
    };

    setRipples((prev) => [...prev, newRipple]);

    Animated.parallel([
      Animated.timing(newRipple.scale, {
        toValue: 3,
        duration: 2000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(newRipple.opacity, {
        toValue: 0,
        duration: 2000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(newRipple.pulse, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(newRipple.pulse, {
          toValue: 0,
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    });
  };

  useEffect(() => {
    addRipple();

    rippleInterval.current = setInterval(() => {
      addRipple();
    }, 1500);

    return () => {
      if (rippleInterval.current) {
        clearInterval(rippleInterval.current);
      }
    };
  }, [disabled, isProcessing]);

  const buttonStyle = {
    transform: [{ scale: pulseAnim }],
    opacity: opacityAnim,
  };

  return (
    <View style={styles.outerContainer}>
      <Pressable onPress={onPress} disabled={disabled} style={styles.container}>
        {/* Fondos con efecto de onda */}
        {ripples.map((ripple) => {
          const rippleStyle = {
            transform: [
              { scale: ripple.scale },
              {
                scale: ripple.pulse.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.1], // Más sutil
                }),
              },
            ],
            opacity: ripple.opacity,
            backgroundColor: isProcessing
              ? "rgba(255, 215, 0, 0.2)" // Amarillo más transparente
              : "rgba(255, 255, 255, 0.2)", // Blanco más transparente
          };

          return (
            <Animated.View
              key={ripple.id}
              style={[styles.ripple, rippleStyle]}
            />
          );
        })}

        {/* Botón principal con efecto de pulso */}
        <Animated.View
          style={[styles.button, buttonStyle, disabled && styles.disabled]}
        >
          <View style={[styles.innerButton, isProcessing && styles.processing]}>
            {children}
          </View>
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: "absolute",
    bottom: 32,
    alignSelf: "center",
    width: sizes.screenWidth / 2,
    height: sizes.screenWidth / 2,
  },
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  button: {
    width: "80%",
    height: "80%",
    borderRadius: 999,
    backgroundColor: "#5B2CE3",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    borderWidth: 4,
    borderColor: theme.colors.basico2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  innerButton: {
    width: "100%",
    height: "100%",
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5B2CE3",
  },
  ripple: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 999,
    zIndex: 1,
  },
  disabled: {
    opacity: 0.6,
  },
  processing: {
    backgroundColor: "#FFD700",
  },
});

export default RippleButton;
