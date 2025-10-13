import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Ex10: React.FC = () => {
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

  const changeColor = (
    color: "red" | "green" | "blue",
    amount: number
  ): void => {
    if (color === "red") {
      setRed((prev) => Math.min(255, Math.max(0, prev + amount)));
    } else if (color === "green") {
      setGreen((prev) => Math.min(255, Math.max(0, prev + amount)));
    } else {
      setBlue((prev) => Math.min(255, Math.max(0, prev + amount)));
    }
  };

  const renderControl = (label: string, value: number, color: "red" | "green" | "blue") => (
    <View style={styles.row}>
      <Text style={styles.label}>
        {label}: {value}
      </Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => changeColor(color, -1)}
        >
          <Text style={styles.btnText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => changeColor(color, +1)}
        >
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Preview Color */}
      <View
        style={[
          styles.preview,
          { backgroundColor: `rgb(${red}, ${green}, ${blue})` },
        ]}
      />

      {/* Controls */}
      {renderControl("Red", red, "red")}
      {renderControl("Green", green, "green")}
      {renderControl("Blue", blue, "blue")}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  preview: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    backgroundColor: "#4a90e2",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  btnText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Ex10;
