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

interface Program {
  id: string;
  name: string;
  image: any;
}

const programsData: Program[] = [
  {
    id: "1",
    name: "abs",
    image: require("../assets/muscle_groups/abs.jpg"),
  },
  {
    id: "2",
    name: "arms",
    image: require("../assets/muscle_groups/arms.jpg"),
  },
  {
    id: "3",
    name: "back",
    image: require("../assets/muscle_groups/back.jpg"),
  },
  {
    id: "4",
    name: "biceps",
    image: require("../assets/muscle_groups/biceps.jpg"),
  },
  {
    id: "5",
    name: "chest",
    image: require("../assets/muscle_groups/chest.jpg"),
  },
  {
    id: "6",
    name: "glutes",
    image: require("../assets/muscle_groups/glutes.jpg"),
  },
  {
    id: "7",
    name: "triceps",
    image: require("../assets/muscle_groups/triceps.jpg"),
  },
];

const ProgramCard = ({ item }: { item: Program }) => {
  const navigation = useNavigation();

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handlePress = () => {
    if (item.name === "glutes") {
      navigation.navigate("GlutesExercises" as never);
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
      <Text style={styles.cardTitle}>{capitalizeFirstLetter(item.name)}</Text>
    </TouchableOpacity>
  );
};

export default function ProgramsScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={programsData}
        renderItem={({ item }) => <ProgramCard item={item} />}
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
