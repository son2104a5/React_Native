import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Ex9: React.FC = () => {
  const [light, setLight] = useState<"red" | "yellow" | "green">("green");

  const handleNextLight = () => {
    if (light === "green") setLight("yellow");
    else if (light === "yellow") setLight("red");
    else setLight("green");
  };

  const renderLight = (color: "red" | "yellow" | "green") => {
    const isActive = light === color;
    const colors: Record<typeof color, string> = {
      red: "red",
      yellow: "yellow",
      green: "green",
    };
    return (
      <View
        style={[
          styles.light,
          { backgroundColor: colors[color], opacity: isActive ? 1 : 0.3 },
        ]}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderLight("red")}
      {renderLight("yellow")}
      {renderLight("green")}

      <TouchableOpacity style={styles.button} onPress={handleNextLight}>
        <Text style={styles.buttonText}>Chuyển Đèn</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  light: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginVertical: 10,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#4a90e2",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Ex9;
