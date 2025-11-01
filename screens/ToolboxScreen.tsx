import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ToolboxScreen() {
  const waterPercentage = 0;
  const bmi = 0.0;

  // Calculate BMI position on gradient (assuming range 0-40)
  const bmiPosition = Math.min(bmi / 40, 1) * 100;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Toolbox</Text>

      {/* Calorie Tracker Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="flame" size={20} color="#FF6B00" />
            <Text style={styles.cardTitle}>Calorie Tracker</Text>
          </View>
          <View style={styles.cardIconRow}>
            <Ionicons name="flame-outline" size={16} color="#666" />
            <Text style={styles.cardIconText}>0</Text>
          </View>
        </View>

        <View style={styles.calorieData}>
          <View style={styles.calorieSection}>
            <Text style={styles.calorieLabel}>+ EATEN</Text>
            <Text style={styles.calorieValue}>0</Text>
          </View>
          <View style={styles.calorieSection}>
            <Text style={styles.calorieLabel}>- BURNED</Text>
            <Text style={[styles.calorieValue, styles.burnedValue]}>880</Text>
          </View>
          <TouchableOpacity style={styles.logButton}>
            <Text style={styles.logButtonText}>Log Meal &gt;</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.remainingText}>Remaining 3 341 kcal</Text>
      </View>

      {/* Water Minder Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="water" size={20} color="#4A90E2" />
            <Text style={styles.cardTitle}>Water Minder</Text>
          </View>
          <View style={styles.cardIconRow}>
            <Ionicons name="water-outline" size={16} color="#666" />
            <Text style={styles.cardIconText}>0</Text>
          </View>
        </View>

        <View style={styles.waterData}>
          <View style={styles.waterProgressContainer}>
            <View style={styles.waterCircleOuter} />
            {waterPercentage > 0 && (
              <View
                style={[
                  styles.waterCircleProgress,
                  {
                    transform: [
                      {
                        rotate: `${(waterPercentage / 100) * 360 - 90}deg`,
                      },
                    ],
                  },
                ]}
              />
            )}
            <View style={styles.waterPercentageText}>
              <Text style={styles.waterPercentage}>{waterPercentage}%</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.logButton}>
            <Text style={styles.logButtonText}>Log Drink &gt;</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Weight Tracker Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="scale-outline" size={20} color="#999" />
            <Text style={styles.cardTitle}>Weight Tracker</Text>
          </View>
          <Text style={styles.weightChange}>- 0 kg</Text>
        </View>

        <View style={styles.weightData}>
          <View style={styles.bmiSection}>
            <Text style={styles.bmiValue}>{bmi.toFixed(1)}</Text>
            <Text style={styles.bmiLabel}>YOUR BMI</Text>
          </View>
          <TouchableOpacity style={styles.logButton}>
            <Text style={styles.logButtonText}>Log Weight &gt;</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bmiBarContainer}>
          <View style={styles.bmiBar}>
            <View style={[styles.bmiSegment, styles.underweight]} />
            <View style={[styles.bmiSegment, styles.normal]} />
            <View style={[styles.bmiSegment, styles.overweight]} />
            <View style={[styles.bmiSegment, styles.obese]} />
          </View>
          <View style={[styles.bmiMarker, { left: `${bmiPosition}%` }]} />
          <View style={styles.bmiLabels}>
            <Text style={styles.bmiLabelText}>Underweight</Text>
            <Text style={styles.bmiLabelText}>Normal</Text>
            <Text style={styles.bmiLabelText}>Overweight</Text>
            <Text style={styles.bmiLabelText}>Obese</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#1A1A1A",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  cardIconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  cardIconText: {
    fontSize: 14,
    color: "#666",
  },
  calorieData: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  calorieSection: {
    flex: 1,
    alignItems: "flex-start",
  },
  calorieLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  calorieValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  burnedValue: {
    fontSize: 32,
    fontWeight: "bold",
  },
  logButton: {
    backgroundColor: "#2A2A2A",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  logButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  remainingText: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
  },
  waterData: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  waterProgressContainer: {
    position: "relative",
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  waterCircleOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: "#333",
    position: "absolute",
    overflow: "hidden",
  },
  waterCircleProgress: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: "#4A90E2",
    position: "absolute",
  },
  waterPercentageText: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 80,
  },
  waterPercentage: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  weightData: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  weightChange: {
    fontSize: 14,
    color: "#fff",
  },
  bmiSection: {
    flex: 1,
  },
  bmiValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  bmiLabel: {
    fontSize: 12,
    color: "#999",
  },
  bmiBarContainer: {
    marginTop: 8,
  },
  bmiBar: {
    flexDirection: "row",
    height: 24,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 8,
    position: "relative",
  },
  bmiSegment: {
    flex: 1,
  },
  underweight: {
    backgroundColor: "#4CAF50",
  },
  normal: {
    backgroundColor: "#8BC34A",
  },
  overweight: {
    backgroundColor: "#FF9800",
  },
  obese: {
    backgroundColor: "#F44336",
  },
  bmiMarker: {
    position: "absolute",
    top: -4,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#fff",
    transform: [{ translateX: -6 }],
  },
  bmiLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  bmiLabelText: {
    fontSize: 10,
    color: "#666",
    flex: 1,
    textAlign: "center",
  },
});
