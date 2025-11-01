import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface Badge {
  name: string;
  icon: string;
  color: string;
  unlocked?: boolean;
}

interface BadgesSectionProps {
  badges: Badge[];
  onViewAll?: () => void;
}

export default function BadgesSection({
  badges,
  onViewAll,
}: BadgesSectionProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleRow}>
          <Ionicons name="star" size={20} color="#F44336" />
          <Text style={styles.cardTitle}>Badges</Text>
        </View>
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.badgesGrid}>
        {badges.map((badge, index) => {
          const isUnlocked = badge.unlocked ?? false;
          return (
            <View key={index} style={styles.badgeItem}>
              <View
                style={[
                  styles.badgeCircle,
                  {
                    backgroundColor: isUnlocked
                      ? `${badge.color}20`
                      : "#1A1A1A",
                    borderWidth: isUnlocked ? 0 : 1,
                    borderColor: isUnlocked ? "transparent" : "#333",
                  },
                ]}
              >
                <Ionicons
                  name={badge.icon as any}
                  size={24}
                  color={isUnlocked ? badge.color : "#666"}
                />
              </View>
              <Text
                style={[
                  styles.badgeLabel,
                  { color: isUnlocked ? "#ccc" : "#666" },
                ]}
              >
                {badge.name}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 20,
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
  viewAllText: {
    fontSize: 14,
    color: "#4A90E2",
    fontWeight: "500",
  },
  badgesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  badgeItem: {
    width: "30%",
    alignItems: "center",
    marginBottom: 20,
  },
  badgeCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  badgeLabel: {
    fontSize: 11,
    textAlign: "center",
    fontWeight: "500",
  },
});
