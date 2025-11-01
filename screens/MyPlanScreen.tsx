import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MyPlanScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Plan</Text>
      <Text style={styles.subtitle}>Your personalized plan goes here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  subtitle: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
  },
});
