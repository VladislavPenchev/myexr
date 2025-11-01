import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Badge {
  name: string;
  icon: string;
  color: string;
  unlocked?: boolean;
}

interface AllBadgesModalProps {
  visible: boolean;
  badges: Badge[];
  onClose: () => void;
}

// All possible badges in the app
export const ALL_BADGES: Badge[] = [
  { name: "Calorie Starter", icon: "flame", color: "#FF6B00" },
  { name: "Consistent 3", icon: "radio-button-on", color: "#4A90E2" },
  { name: "Calorie Week", icon: "calendar", color: "#9C27B0" },
  { name: "Calorie Crusher", icon: "fitness", color: "#F44336" },
  { name: "Smart Eater", icon: "brain", color: "#FF9800" },
  { name: "Nutrition King", icon: "trophy", color: "#FFD700" },
  { name: "First Sip", icon: "water", color: "#4A90E2" },
  { name: "Hydrated 3", icon: "water-outline", color: "#4A90E2" },
  { name: "Water Week", icon: "wave", color: "#4A90E2" },
  { name: "Aqua Streak", icon: "snow", color: "#4A90E2" },
  { name: "Water Warrior", icon: "heart", color: "#F44336" },
  { name: "H2O Hero", icon: "trophy", color: "#FFD700" },
  { name: "Community Voice", icon: "chatbubbles", color: "#4A90E2" },
  { name: "Supporter", icon: "hand-left", color: "#4CAF50" },
  { name: "App Star", icon: "star", color: "#FFD700" },
];

export default function AllBadgesModal({
  visible,
  badges,
  onClose,
}: AllBadgesModalProps) {
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(500)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [shouldRender, setShouldRender] = useState(false);

  // Create a map of unlocked badges for quick lookup
  const unlockedBadgesMap = new Map(
    badges.filter((b) => b.unlocked).map((b) => [b.name, true])
  );

  // Merge all badges with unlocked status
  const allBadgesWithStatus = ALL_BADGES.map((badge) => ({
    ...badge,
    unlocked: unlockedBadgesMap.has(badge.name),
  }));

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      // Reset animations to initial state
      slideAnim.setValue(500);
      fadeAnim.setValue(0);

      // Small delay to ensure render happens first
      setTimeout(() => {
        // Animate in
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.spring(slideAnim, {
            toValue: 0,
            tension: 50,
            friction: 10,
            useNativeDriver: true,
          }),
        ]).start();
      }, 10);
    } else if (shouldRender) {
      // Animate out - smooth and natural
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 500,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShouldRender(false);
      });
    }
  }, [visible, fadeAnim, slideAnim, shouldRender]);

  if (!shouldRender) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        </Animated.View>
        <Animated.View
          style={[
            styles.container,
            {
              paddingBottom: insets.bottom,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Drag Handle */}
          <View style={styles.dragHandle} />

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Your Achievements</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Badges Grid */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.badgesGrid}>
              {allBadgesWithStatus.map((badge, index) => {
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
                        size={32}
                        color={isUnlocked ? badge.color : "#666"}
                      />
                    </View>
                    <Text
                      style={[
                        styles.badgeLabel,
                        { color: isUnlocked ? "#fff" : "#666" },
                      ]}
                    >
                      {badge.name}
                    </Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    backgroundColor: "#000",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 0.9,
    maxHeight: "90%",
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#fff",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#1A1A1A",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  closeButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  badgesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  badgeItem: {
    width: "30%",
    alignItems: "center",
    marginBottom: 24,
  },
  badgeCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  badgeLabel: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
  },
});
