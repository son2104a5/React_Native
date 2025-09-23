import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";

type ButtonType = "primary" | "secondary" | "danger" | "disabled";

interface CustomButtonProps {
  title: string;
  type?: ButtonType;
  onPress?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, type = "primary", onPress }) => {
  const isDisabled = type === "disabled";

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        styles[type],
        pressed && !isDisabled && styles.pressed,
      ]}
      onPress={!isDisabled ? onPress : undefined}
      disabled={isDisabled}
    >
      <Text style={[styles.text, styles[`${type}Text`]]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 250,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 8,
  },

  text: {},

  // Primary
  primary: {
    backgroundColor: "#007bff",
  },
  primaryText: {
    color: "#fff",
    fontWeight: "bold",
  },

  // Secondary (viền xanh, nền trắng)
  secondary: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#007bff",
  },
  secondaryText: {
    color: "#007bff",
    fontWeight: "bold",
  },

  // Danger
  danger: {
    backgroundColor: "#dc3545",
  },
  dangerText: {
    color: "#fff",
    fontWeight: "bold",
  },

  // Disabled
  disabled: {
    backgroundColor: "#aaa",
  },
  disabledText: {
    color: "#666",
    fontWeight: "bold",
  },

  // Khi nhấn giữ
  pressed: {
    opacity: 0.7,
  },
});

export default CustomButton;
