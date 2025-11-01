import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { RouteProp, useRoute } from "@react-navigation/native";

const { width: screenWidth } = Dimensions.get("window");
const videoWidth = screenWidth - 40; // Minus padding (20 on each side)
const videoHeight = (videoWidth * 16) / 9; // 9:16 aspect ratio

interface ExerciseDetailParams {
  ExerciseDetail: {
    id: string;
    name: string;
    title: string;
    description: string;
    video: any;
  };
}

export default function ExerciseDetailScreen() {
  const route = useRoute();
  const params = route.params as ExerciseDetailParams["ExerciseDetail"];
  const { title, description, video, name } = params;

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // For local videos using require(), we need to use assetId
  const player = useVideoPlayer({
    assetId: typeof video === "number" ? video : undefined,
  });

  useEffect(() => {
    if (player) {
      try {
        player.loop = true;
        player.play();
      } catch (error) {
        // Silently handle play errors
        console.log("Video play error:", error);
      }
    }
  }, [player]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{capitalizeFirstLetter(name)}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.videoContainer}>
        <VideoView player={player} style={styles.video} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#ccc",
    lineHeight: 24,
    marginBottom: 30,
    textAlign: "left",
  },
  videoContainer: {
    width: "100%",
    height: videoHeight,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    height: "100%",
  },
});
