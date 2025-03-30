import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function GradientBackground() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#ffffff"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.background}
      >
        {/* Tu contenido aquí */}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
});
