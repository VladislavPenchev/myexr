import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ProfileRowProps {
  icon: string;
  iconColor: string;
  label: string;
  value: string;
  showArrow?: boolean;
  showCopy?: boolean;
  onPress?: () => void;
  onCopy?: () => void;
}

export default function ProfileRow({
  icon,
  iconColor,
  label,
  value,
  showArrow = true,
  showCopy = false,
  onPress,
  onCopy,
}: ProfileRowProps) {
  return (
    <TouchableOpacity
      style={styles.profileRow}
      onPress={onPress}
      disabled={!onPress && !showCopy}
    >
      <View
        style={[styles.iconContainer, { backgroundColor: `${iconColor}20` }]}
      >
        <Ionicons name={icon as any} size={20} color={iconColor} />
      </View>
      <View style={styles.profileRowContent}>
        <Text style={styles.profileRowLabel}>{label}</Text>
        <View style={styles.profileRowValue}>
          <Text style={styles.profileRowValueText}>{value}</Text>
          {showCopy && (
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                if (onCopy) {
                  onCopy();
                }
              }}
              style={styles.copyButton}
            >
              <Ionicons name="copy-outline" size={16} color="#999" />
            </TouchableOpacity>
          )}
          {showArrow && (
            <Ionicons name="chevron-forward" size={20} color="#999" />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  profileRowContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileRowLabel: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
    flex: 1,
  },
  profileRowValue: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  profileRowValueText: {
    fontSize: 14,
    color: "#fff",
    backgroundColor: "#1A1A1A",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    minWidth: 100,
    textAlign: "right",
  },
  copyButton: {
    padding: 4,
  },
});
