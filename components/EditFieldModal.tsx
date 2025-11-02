import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
  Modal,
  Keyboard,
  Platform,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type FieldType = "text" | "slider" | "selection" | "units";

interface SelectionOption {
  label: string;
  value: string;
  icon?: string;
}

interface EditFieldModalProps {
  visible: boolean;
  title: string;
  type: FieldType;
  value: string | number;
  onClose: () => void;
  onUpdate: (value: string | number) => void;
  // For text fields
  rules?: string;
  placeholder?: string;
  // For slider fields
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  // For selection fields
  options?: SelectionOption[];
}

export default function EditFieldModal({
  visible,
  title,
  type,
  value,
  onClose,
  onUpdate,
  rules,
  placeholder,
  min = 0,
  max = 100,
  step = 1,
  unit = "",
  options = [],
}: EditFieldModalProps) {
  const insets = useSafeAreaInsets();
  const [localValue, setLocalValue] = useState<string | number>(value);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const translateY = useRef(new Animated.Value(0)).current;
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value, visible]);

  useEffect(() => {
    if (visible && type === "text") {
      // Focus text input after a short delay to ensure modal is rendered
      setTimeout(() => {
        textInputRef.current?.focus();
        // Move cursor to end of text
        const textLength = (localValue as string).length;
        textInputRef.current?.setNativeProps({
          selection: { start: textLength, end: textLength },
        });
        setShowKeyboard(true);
      }, 100);
    } else {
      setShowKeyboard(false);
      Keyboard.dismiss();
      setKeyboardHeight(0);
      // Reset animation when modal closes
      translateY.setValue(0);
    }
  }, [visible, type, translateY, localValue]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        const height = e.endCoordinates.height;
        setKeyboardHeight(height);
        // Animate container up
        Animated.timing(translateY, {
          toValue: -height,
          duration: Platform.OS === "ios" ? 250 : 150,
          useNativeDriver: true,
        }).start();
      }
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
        // Animate container back down
        Animated.timing(translateY, {
          toValue: 0,
          duration: Platform.OS === "ios" ? 250 : 150,
          useNativeDriver: true,
        }).start();
      }
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [translateY]);

  const handleUpdate = () => {
    onUpdate(localValue);
    onClose();
  };

  const renderContent = () => {
    switch (type) {
      case "text":
        return (
          <View style={styles.textContainer}>
            <TextInput
              ref={textInputRef}
              style={styles.textInput}
              value={localValue as string}
              onChangeText={setLocalValue}
              placeholder={placeholder}
              placeholderTextColor="#666"
              autoFocus={false}
              onFocus={() => {
                setShowKeyboard(true);
                // Move cursor to end of text when focused
                const textLength = (localValue as string).length;
                textInputRef.current?.setNativeProps({
                  selection: { start: textLength, end: textLength },
                });
              }}
            />
            {rules && <Text style={styles.rulesText}>{rules}</Text>}
          </View>
        );

      case "slider": {
        const numericValue =
          typeof localValue === "string"
            ? parseFloat(localValue.replace(/[^0-9.]/g, "")) || min
            : localValue;
        const displayValue = Math.round(numericValue);

        const handleDecrease = () => {
          const newValue = Math.max(min, displayValue - step);
          setLocalValue(newValue);
        };

        const handleIncrease = () => {
          const newValue = Math.min(max, displayValue + step);
          setLocalValue(newValue);
        };

        return (
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderValue}>
              {displayValue} {unit}
            </Text>
            <View style={styles.sliderControls}>
              <TouchableOpacity
                style={styles.sliderButton}
                onPress={handleDecrease}
                disabled={displayValue <= min}
              >
                <Ionicons
                  name="remove-circle-outline"
                  size={40}
                  color={displayValue <= min ? "#666" : "#fff"}
                />
              </TouchableOpacity>
              <View style={styles.sliderBar}>
                <View
                  style={[
                    styles.sliderFill,
                    {
                      width: `${((displayValue - min) / (max - min)) * 100}%`,
                    },
                  ]}
                />
              </View>
              <TouchableOpacity
                style={styles.sliderButton}
                onPress={handleIncrease}
                disabled={displayValue >= max}
              >
                <Ionicons
                  name="add-circle-outline"
                  size={40}
                  color={displayValue >= max ? "#666" : "#fff"}
                />
              </TouchableOpacity>
            </View>
          </View>
        );
      }

      case "selection":
      case "units":
        return (
          <View style={styles.selectionContainer}>
            {options.map((option, index) => {
              const isSelected = localValue === option.value;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.selectionButton,
                    isSelected && styles.selectionButtonSelected,
                  ]}
                  onPress={() => setLocalValue(option.value)}
                >
                  {option.icon && (
                    <Text style={styles.selectionIcon}>{option.icon}</Text>
                  )}
                  <Text
                    style={[
                      styles.selectionButtonText,
                      isSelected && styles.selectionButtonTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                  {isSelected && (
                    <View style={styles.checkmark}>
                      <Ionicons name="checkmark" size={20} color="#000" />
                    </View>
                  )}
                  {!isSelected && <View style={styles.emptyCircle} />}
                </TouchableOpacity>
              );
            })}
          </View>
        );

      default:
        return null;
    }
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
        <Animated.View
          style={[
            styles.container,
            {
              paddingBottom: Math.max(insets.bottom + 20, 20),
              transform: [{ translateY }],
            },
          ]}
        >
          {/* Drag Handle */}
          <View style={styles.dragHandle} />

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
          </View>

          {/* Content */}
          <View style={styles.content}>{renderContent()}</View>

          {/* Update Button */}
          <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>
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
    paddingBottom: 20,
    maxHeight: "85%",
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
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    minHeight: 200,
  },
  // Text field styles
  textContainer: {
    alignItems: "center",
  },
  textInput: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    width: "100%",
    paddingVertical: 20,
  },
  rulesText: {
    fontSize: 14,
    color: "#999",
    marginTop: 16,
    textAlign: "center",
  },
  // Slider styles
  sliderContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  sliderValue: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 32,
  },
  sliderControls: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 16,
  },
  sliderButton: {
    padding: 8,
  },
  sliderBar: {
    flex: 1,
    height: 4,
    backgroundColor: "#333",
    borderRadius: 2,
    overflow: "hidden",
  },
  sliderFill: {
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 2,
  },
  // Selection styles
  selectionContainer: {
    gap: 12,
  },
  selectionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#333",
  },
  selectionButtonSelected: {
    backgroundColor: "#2A2A2A",
    borderColor: "#fff",
  },
  selectionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  selectionButtonText: {
    flex: 1,
    fontSize: 16,
    color: "#999",
    fontWeight: "500",
  },
  selectionButtonTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#666",
  },
  updateButton: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
  },
  updateButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
});
