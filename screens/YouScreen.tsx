import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BadgesSection, { Badge } from "../components/profile/BadgesSection";
import AllBadgesModal from "../components/profile/AllBadgesModal";
import { getUserProfile } from "../services/userService";
import { getCurrentUserId } from "../services/authService";

export default function YouScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [isAllBadgesVisible, setIsAllBadgesVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Vladislav");
  const [badges, setBadges] = useState<Badge[]>([
    {
      name: "Calorie Starter",
      icon: "flame",
      color: "#FF6B00",
      unlocked: true,
    },
    {
      name: "Consistent 3",
      icon: "radio-button-on",
      color: "#4A90E2",
      unlocked: true,
    },
    {
      name: "Calorie Week",
      icon: "calendar",
      color: "#9C27B0",
      unlocked: true,
    },
    {
      name: "Calorie Crusher",
      icon: "fitness",
      color: "#F44336",
      unlocked: false,
    },
    { name: "Smart Eater", icon: "brain", color: "#FF9800", unlocked: false },
    {
      name: "Nutrition King",
      icon: "trophy",
      color: "#FFD700",
      unlocked: false,
    },
  ]);

  // Load user data from Firebase
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        const userId = await getCurrentUserId();
        const profile = await getUserProfile(userId);

        if (profile) {
          // Update user name
          if (profile.name) {
            setUserName(profile.name);
          }

          // Update badges if they exist in profile
          if (profile.badges && profile.badges.length > 0) {
            // Map badges from profile to Badge format
            const profileBadges: Badge[] = [
              {
                name: "Calorie Starter",
                icon: "flame",
                color: "#FF6B00",
                unlocked:
                  profile.badges.find((b) => b.name === "Calorie Starter")
                    ?.unlocked || false,
              },
              {
                name: "Consistent 3",
                icon: "radio-button-on",
                color: "#4A90E2",
                unlocked:
                  profile.badges.find((b) => b.name === "Consistent 3")
                    ?.unlocked || false,
              },
              {
                name: "Calorie Week",
                icon: "calendar",
                color: "#9C27B0",
                unlocked:
                  profile.badges.find((b) => b.name === "Calorie Week")
                    ?.unlocked || false,
              },
              {
                name: "Calorie Crusher",
                icon: "fitness",
                color: "#F44336",
                unlocked:
                  profile.badges.find((b) => b.name === "Calorie Crusher")
                    ?.unlocked || false,
              },
              {
                name: "Smart Eater",
                icon: "brain",
                color: "#FF9800",
                unlocked:
                  profile.badges.find((b) => b.name === "Smart Eater")
                    ?.unlocked || false,
              },
              {
                name: "Nutrition King",
                icon: "trophy",
                color: "#FFD700",
                unlocked:
                  profile.badges.find((b) => b.name === "Nutrition King")
                    ?.unlocked || false,
              },
            ];
            setBadges(profileBadges);
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Refresh data when returning from EditProfile
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      try {
        const userId = await getCurrentUserId();
        const profile = await getUserProfile(userId);
        if (profile && profile.name) {
          setUserName(profile.name);
        }
      } catch (error) {
        console.error("Error refreshing user data:", error);
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingTop: Math.max(insets.top + 20, 40) },
      ]}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.greeting}>Hi {userName}</Text>
            <TouchableOpacity>
              <Ionicons name="settings-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={60} color="#fff" />
              </View>
            </View>
            <View style={styles.profileBar}>
              <TouchableOpacity
                style={styles.profileBarLeft}
                onPress={() => navigation.navigate("EditProfile" as never)}
              >
                <Ionicons name="create-outline" size={16} color="#FFD700" />
                <Text style={styles.profileBarText}>Edit Profile</Text>
              </TouchableOpacity>
              <View style={styles.profileBarDivider} />
              <View style={styles.profileBarRight}>
                <Ionicons name="person-outline" size={16} color="#4A90E2" />
                <Text style={styles.profileBarText}>Free User</Text>
              </View>
            </View>
          </View>

          <BadgesSection
            badges={badges}
            onViewAll={() => setIsAllBadgesVisible(true)}
          />

          {/* All Badges Modal */}
          <AllBadgesModal
            visible={isAllBadgesVisible}
            badges={badges}
            onClose={() => setIsAllBadgesVisible(false)}
          />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingHorizontal: 0,
  },
  greeting: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  avatarContainer: {
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#1A1A1A",
    borderWidth: 2,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  profileBar: {
    flexDirection: "row",
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    height: 50,
    width: "100%",
    overflow: "hidden",
  },
  profileBarLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  profileBarDivider: {
    width: 1,
    backgroundColor: "#333",
  },
  profileBarRight: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  profileBarText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
  },
  followersText: {
    fontSize: 14,
    color: "#999",
    fontWeight: "500",
  },
  socialTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  socialSubtitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  socialSubtitle: {
    fontSize: 14,
    color: "#999",
  },
  emoji: {
    fontSize: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
});
