import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SetData {
  weight: string;
  reps: string;
}

interface ExerciseLogModalProps {
  visible: boolean;
  exerciseName: string;
  exerciseType: string;
  sets: number;
  reps: number;
  onClose: () => void;
  onSave: (setsData: SetData[]) => void;
}

export default function ExerciseLogModal({
  visible,
  exerciseName,
  exerciseType,
  sets,
  reps,
  onClose,
  onSave,
}: ExerciseLogModalProps) {
  const [setsData, setSetsData] = useState<SetData[]>([]);

  useEffect(() => {
    if (visible) {
      // Initialize sets data with default values
      const initialSets: SetData[] = Array.from({ length: sets }, () => ({
        weight: "",
        reps: reps.toString(),
      }));
      setSetsData(initialSets);
    }
  }, [visible, sets, reps]);

  const updateSetData = (
    index: number,
    field: "weight" | "reps",
    value: string
  ) => {
    const newSetsData = [...setsData];
    newSetsData[index] = {
      ...newSetsData[index],
      [field]: value,
    };
    setSetsData(newSetsData);
  };

  const handleSave = () => {
    onSave(setsData);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.container}>
          {/* Drag Handle */}
          <View style={styles.dragHandle} />

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{exerciseName}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Exercise Type Badge */}
          <View style={styles.typeBadgeContainer}>
            <Text style={styles.typeBadgeText}>
              {exerciseType.toUpperCase()}
            </Text>
          </View>

          {/* Sets List */}
          <ScrollView
            style={styles.setsList}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.setsTitle}>Sets</Text>
            {setsData.map((set, index) => (
              <View key={index} style={styles.setRow}>
                <View style={styles.setNumber}>
                  <Text style={styles.setNumberText}>{index + 1}</Text>
                </View>

                <View style={styles.setInputs}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Weight (kg)</Text>
                    <TextInput
                      style={styles.input}
                      value={set.weight}
                      onChangeText={(value) =>
                        updateSetData(index, "weight", value)
                      }
                      placeholder="0"
                      placeholderTextColor="#666"
                      keyboardType="decimal-pad"
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Reps</Text>
                    <TextInput
                      style={styles.input}
                      value={set.reps}
                      onChangeText={(value) =>
                        updateSetData(index, "reps", value)
                      }
                      placeholder={reps.toString()}
                      placeholderTextColor="#666"
                      keyboardType="number-pad"
                    />
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
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
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    backgroundColor: "#000",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "85%",
    paddingBottom: 20,
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  closeButton: {
    position: "absolute",
    right: 20,
    padding: 4,
  },
  typeBadgeContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#999",
    letterSpacing: 1,
  },
  setsList: {
    paddingHorizontal: 20,
    maxHeight: 400,
  },
  setsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 16,
  },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 16,
  },
  setNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#1A1A1A",
    justifyContent: "center",
    alignItems: "center",
  },
  setNumberText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  setInputs: {
    flex: 1,
    flexDirection: "row",
    gap: 12,
  },
  inputGroup: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#1A1A1A",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#333",
  },
  saveButton: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
});
