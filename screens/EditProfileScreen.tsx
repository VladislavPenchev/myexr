import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ProfileRow from "../components/ProfileRow";
import EditFieldModal, { FieldType } from "../components/EditFieldModal";
import {
  getUserProfile,
  saveUserProfile,
  updateUserField,
} from "../services/userService";
import { getCurrentUserId } from "../services/authService";

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const [openField, setOpenField] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const [profileData, setProfileData] = useState({
    account: "vladislav.penchev@icloud....",
    name: "Vladislav",
    gender: "Male",
    age: "28 years",
    height: "177 cm",
    weight: "0.0 kg",
    units: "Metric",
  });

  // Load user profile on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const currentUserId = await getCurrentUserId();
        setUserId(currentUserId);

        const profile = await getUserProfile(currentUserId);

        if (profile) {
          setProfileData({
            account: profile.account || "vladislav.penchev@icloud....",
            name: profile.name || "Vladislav",
            gender: profile.gender || "Male",
            age: profile.age || "28 years",
            height: profile.height || "177 cm",
            weight: profile.weight || "0.0 kg",
            units: profile.units || "Metric",
          });
        } else {
          // Create default profile if doesn't exist
          if (userId) {
            await saveUserProfile(currentUserId, {
              account: profileData.account,
              name: profileData.name,
              gender: profileData.gender,
              age: profileData.age,
              height: profileData.height,
              weight: profileData.weight,
              units: profileData.units,
            });
          }
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const updateField = async (field: string, value: string | number) => {
    if (!userId) return;

    try {
      setSaving(true);

      // Update local state
      setProfileData((prev) => {
        const updated = { ...prev };

        switch (field) {
          case "name":
            updated.name = value as string;
            break;
          case "gender":
            updated.gender = value as string;
            break;
          case "age":
            updated.age = `${value} years`;
            break;
          case "height":
            updated.height = `${value} cm`;
            break;
          case "units":
            updated.units = value as string;
            break;
        }

        return updated;
      });

      // Save to Firebase
      let fieldName = field;
      let fieldValue: string | number = value;

      // Convert age and height to proper format for Firebase
      if (field === "age") {
        fieldName = "age";
        fieldValue = `${value} years`;
      } else if (field === "height") {
        fieldName = "height";
        fieldValue = `${value} cm`;
      }

      await updateUserField(userId, fieldName, fieldValue);
    } catch (error) {
      console.error("Error updating field:", error);
      // Optionally show error message to user
    } finally {
      setSaving(false);
      setOpenField(null);
    }
  };

  const getFieldValue = (field: string): string | number => {
    switch (field) {
      case "name":
        return profileData.name;
      case "gender":
        return profileData.gender;
      case "age":
        return parseInt(profileData.age.replace(" years", "")) || 28;
      case "height":
        return parseInt(profileData.height.replace(" cm", "")) || 177;
      case "units":
        return profileData.units;
      default:
        return "";
    }
  };

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        {/* Drag Handle */}
        <View style={styles.dragHandle} />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {/* YOU Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>YOU</Text>

              <ProfileRow
                icon="id-card-outline"
                iconColor="#9C27B0"
                label="Account"
                value={profileData.account}
                showArrow={false}
                showCopy={true}
                onCopy={() => {
                  // Handle copy
                }}
              />

              <View style={styles.divider} />

              <ProfileRow
                icon="person-outline"
                iconColor="#4A90E2"
                label="Name"
                value={profileData.name}
                onPress={() => setOpenField("name")}
              />

              <View style={styles.divider} />

              <ProfileRow
                icon="transgender-outline"
                iconColor="#4A90E2"
                label="Gender"
                value={profileData.gender}
                onPress={() => setOpenField("gender")}
              />

              <View style={styles.divider} />

              <ProfileRow
                icon="cake-outline"
                iconColor="#4A90E2"
                label="Age"
                value={profileData.age}
                onPress={() => setOpenField("age")}
              />

              <View style={styles.divider} />

              <ProfileRow
                icon="resize-outline"
                iconColor="#4A90E2"
                label="Height"
                value={profileData.height}
                onPress={() => setOpenField("height")}
              />

              <View style={styles.divider} />

              <ProfileRow
                icon="scale-outline"
                iconColor="#4A90E2"
                label="Weight"
                value={profileData.weight}
                showArrow={false}
              />
            </View>

            {/* FITNESS SETTINGS Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>FITNESS SETTINGS</Text>

              <ProfileRow
                icon="triangle-outline"
                iconColor="#4A90E2"
                label="Units"
                value={profileData.units}
                onPress={() => setOpenField("units")}
              />

              <View style={styles.divider} />

              <ProfileRow
                icon="fitness-outline"
                iconColor="#8B4513"
                label="My Equipments"
                value="Edit"
                onPress={() => {
                  // Handle equipments edit
                }}
              />
            </View>
          </ScrollView>
        )}
      </View>

      {/* Edit Field Modals */}
      {openField === "name" && (
        <EditFieldModal
          visible={openField === "name"}
          title={profileData.name}
          type="text"
          value={profileData.name}
          onClose={() => setOpenField(null)}
          onUpdate={(value) => updateField("name", value)}
          rules="Rules: 3-12 letters • no spaces • no numbers"
          placeholder="Enter name"
        />
      )}

      {openField === "gender" && (
        <EditFieldModal
          visible={openField === "gender"}
          title="Your Gender"
          type="selection"
          value={profileData.gender}
          onClose={() => setOpenField(null)}
          onUpdate={(value) => updateField("gender", value)}
          options={[
            { label: "Male", value: "Male", icon: "😊" },
            { label: "Female", value: "Female", icon: "😊" },
          ]}
        />
      )}

      {openField === "age" && (
        <EditFieldModal
          visible={openField === "age"}
          title="Your Age"
          type="slider"
          value={getFieldValue("age")}
          onClose={() => setOpenField(null)}
          onUpdate={(value) => updateField("age", value)}
          min={10}
          max={100}
          step={1}
          unit="years"
        />
      )}

      {openField === "height" && (
        <EditFieldModal
          visible={openField === "height"}
          title="Your Height"
          type="slider"
          value={getFieldValue("height")}
          onClose={() => setOpenField(null)}
          onUpdate={(value) => updateField("height", value)}
          min={100}
          max={250}
          step={1}
          unit="cm"
        />
      )}

      {openField === "units" && (
        <EditFieldModal
          visible={openField === "units"}
          title="Units"
          type="units"
          value={profileData.units}
          onClose={() => setOpenField(null)}
          onUpdate={(value) => updateField("units", value)}
          options={[
            { label: "Metric (kg, cm)", value: "Metric" },
            { label: "Imperial (lbs, ft)", value: "Imperial" },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    flex: 0.95,
    backgroundColor: "#000",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
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
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  closeButton: {
    position: "absolute",
    right: 20,
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    textTransform: "uppercase",
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: "#1A1A1A",
    marginLeft: 52,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
