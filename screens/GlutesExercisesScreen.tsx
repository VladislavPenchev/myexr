import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

interface Exercise {
  id: string;
  name: string;
  title: string;
  description: string;
  video: any;
  image: any;
}

const glutesExercisesData: Exercise[] = [
  {
    id: "1",
    name: "donkey kick",
    title: "Donkey Kick with Resistance Band",
    description:
      "Donkey kicks are an effective glute exercise that targets the gluteus maximus and helps improve hip stability. This exercise is performed on all fours, kicking one leg back and up while keeping the core engaged. Using a resistance band adds extra tension for better muscle activation.",
    video: require("../assets/videos/donkey_kick_with_resistance_band.mp4"),
    image: require("../assets/glutues_exercises/donkey_kick_with_resistance_band.jpg"),
  },
  {
    id: "2",
    name: "glute kickback",
    title: "Glute Kickback with Resistance Band",
    description:
      "Glute kickbacks isolate and strengthen the glute muscles, particularly the gluteus maximus. This exercise helps improve hip extension and posterior chain strength. The resistance band provides constant tension throughout the movement, making it more effective than bodyweight alone.",
    video: require("../assets/videos/glute_kickback_with_resistance_band.mp4"),
    image: require("../assets/glutues_exercises/glute_kickback_with_resistance_band.jpg"),
  },
  {
    id: "3",
    name: "kickback",
    title: "Kickback with Resistance Band",
    description:
      "Kickbacks are a versatile exercise that primarily targets the glutes and hamstrings. They help build lower body strength and improve hip mobility. The resistance band increases the challenge and ensures your glutes are working throughout the entire range of motion.",
    video: require("../assets/videos/kickback_with_resistance_band.mp4"),
    image: require("../assets/glutues_exercises/kickback_with_resistance_band.jpg"),
  },
  {
    id: "4",
    name: "kneeling hip thrust",
    title: "Kneeling Hip Thrust with Resistance Band",
    description:
      "Kneeling hip thrusts are excellent for activating the glute muscles and improving hip extension power. This exercise is performed in a kneeling position, pushing the hips forward against the resistance band. It's great for building glute strength and improving athletic performance.",
    video: require("../assets/videos/kneeling_hip_thrust_with_resistance_band.mp4"),
    image: require("../assets/glutues_exercises/kneeling_hip_thrust_with_resistance_band.jpg"),
  },
];

const ExerciseCard = ({ item }: { item: Exercise }) => {
  const navigation = useNavigation();

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handlePress = () => {
    (navigation as any).navigate("ExerciseDetail", {
      id: item.id,
      name: item.name,
      title: item.title,
      description: item.description,
      video: item.video,
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
      <Text style={styles.cardTitle}>{capitalizeFirstLetter(item.name)}</Text>
    </TouchableOpacity>
  );
};

export default function GlutesExercisesScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={glutesExercisesData}
        renderItem={({ item }) => <ExerciseCard item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={1}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    width: "90%",
    height: 350,
    alignSelf: "center",
    backgroundColor: "#ffffff",
    borderRadius: 24,
    margin: 8,
    borderWidth: 1,
    borderColor: "#5b5b5b",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 300,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    paddingVertical: 15,
    backgroundColor: "black",
  },
});
