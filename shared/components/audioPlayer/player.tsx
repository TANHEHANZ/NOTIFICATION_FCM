import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";

interface AudioPlayerProps {
  audioUrl: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const loadAudio = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
        setSound(sound);
      } catch (error) {
        console.error("Error al cargar el audio:", error);
      }
    };

    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [audioUrl]);

  const togglePlayPause = async () => {
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  return (
    <TouchableOpacity onPress={togglePlayPause} style={styles.button}>
      <MaterialIcons
        name={isPlaying ? "pause" : "play-arrow"}
        size={24} // Tamaño reducido del ícono
        color="#fff"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1DB954",
    borderRadius: 25,
    width: 40, // Tamaño reducido del botón
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8, // Espaciado entre el botón y el texto
  },
});

export default AudioPlayer;
