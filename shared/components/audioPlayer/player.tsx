import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

interface AudioPlayerProps {
  audioUrl: string;
  title?: string;
  artist?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  title = "Canción",
  artist = "Artista",
}) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  useEffect(() => {
    // Cargar y preparar el audio
    const loadAudio = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: false }
        );
        setSound(sound);

        sound.setOnPlaybackStatusUpdate((status: any) => {
          if (status.isLoaded) {
            setDuration(status.durationMillis);
            if (!isSeeking) {
              setPosition(status.positionMillis);
            }
            setIsPlaying(status.isPlaying);
          }
        });

        setIsLoaded(true);
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
    } else {
      await sound.playAsync();
    }
  };

  const handleStop = async () => {
    if (!sound) return;
    await sound.stopAsync();
    setPosition(0);
  };

  const handleSeek = async (value: number) => {
    if (!sound) return;
    setIsSeeking(true);
    await sound.setPositionAsync(value);
    setPosition(value);
    setIsSeeking(false);
  };

  const formatTime = (millis: number) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando audio...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Información de la canción */}
      <View style={styles.trackInfo}>
        <View style={styles.albumArtPlaceholder}>
          <MaterialIcons name="music-note" size={40} color="#555" />
        </View>
        <View style={styles.textInfo}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {artist}
          </Text>
        </View>
      </View>

      {/* Barra de progreso */}
      <View style={styles.progressContainer}>
        <Text style={styles.timeText}>{formatTime(position)}</Text>
        <Slider
          style={styles.progressBar}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onValueChange={handleSeek}
          minimumTrackTintColor="#1DB954"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#1DB954"
        />
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>

      {/* Controles */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={handleStop} style={styles.controlButton}>
          <MaterialIcons name="stop" size={28} color="#555" />
        </TouchableOpacity>

        <TouchableOpacity onPress={togglePlayPause} style={styles.playButton}>
          <MaterialIcons
            name={isPlaying ? "pause" : "play-arrow"}
            size={36}
            color="#fff"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton}>
          <FontAwesome name="step-forward" size={28} color="#555" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  trackInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  albumArtPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  textInfo: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  artist: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  progressBar: {
    flex: 1,
    marginHorizontal: 8,
  },
  timeText: {
    fontSize: 12,
    color: "#666",
    width: 50,
    textAlign: "center",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  controlButton: {
    padding: 12,
    marginHorizontal: 10,
  },
  playButton: {
    backgroundColor: "#1DB954",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    shadowColor: "#1DB954",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default AudioPlayer;
