import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-vector-icons/MaterialCommunityIcons";

const LightBulbScreen = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: isOn ? "#fff8e1" : "#222" }]}>
      {/* Icon bóng đèn */}
      <Icon
        name={isOn ? "lightbulb-on" : "lightbulb-off-outline"}
        size={120}
        color={isOn ? "#ffeb3b" : "#888"}
        style={styles.icon}
      />

      {/* Nút bật/tắt */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: isOn ? "#ff9800" : "#007bff" }]}
        onPress={() => setIsOn(!isOn)}
      >
        <Text style={styles.buttonText}>{isOn ? "TẮT ĐÈN" : "BẬT ĐÈN"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginBottom: 40,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LightBulbScreen;
