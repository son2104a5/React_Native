import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Ex8: React.FC = () => {
  const [display, setDisplay] = useState<string>("0");
  const [firstValue, setFirstValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecond, setWaitingForSecond] = useState<boolean>(false);

  const handleNumberPress = (num: string) => {
    if (display === "0" || waitingForSecond) {
      setDisplay(num);
      setWaitingForSecond(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperatorPress = (op: string) => {
    if (firstValue === null) {
      setFirstValue(display);
    } else if (operator) {
      const result = calculate(firstValue, display, operator);
      setFirstValue(result.toString());
      setDisplay(result.toString());
    }
    setOperator(op);
    setWaitingForSecond(true);
  };

  const calculate = (a: string, b: string, op: string): number => {
    const x = parseFloat(a);
    const y = parseFloat(b);

    switch (op) {
      case "+":
        return x + y;
      case "-":
        return x - y;
      case "*":
        return x * y;
      case "/":
        return y !== 0 ? x / y : NaN;
      default:
        return parseFloat(b);
    }
  };

  const handleEqual = () => {
    if (firstValue !== null && operator) {
      const result = calculate(firstValue, display, operator);
      setDisplay(result.toString());
      setFirstValue(null);
      setOperator(null);
      setWaitingForSecond(false);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setFirstValue(null);
    setOperator(null);
    setWaitingForSecond(false);
  };

  const renderButton = (label: string, onPress: () => void, style?: object) => (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayText}>{display}</Text>
      </View>

      <View style={styles.row}>
        {renderButton("7", () => handleNumberPress("7"))}
        {renderButton("8", () => handleNumberPress("8"))}
        {renderButton("9", () => handleNumberPress("9"))}
        {renderButton("/", () => handleOperatorPress("/"), styles.opBtn)}
      </View>

      <View style={styles.row}>
        {renderButton("4", () => handleNumberPress("4"))}
        {renderButton("5", () => handleNumberPress("5"))}
        {renderButton("6", () => handleNumberPress("6"))}
        {renderButton("*", () => handleOperatorPress("*"), styles.opBtn)}
      </View>

      <View style={styles.row}>
        {renderButton("1", () => handleNumberPress("1"))}
        {renderButton("2", () => handleNumberPress("2"))}
        {renderButton("3", () => handleNumberPress("3"))}
        {renderButton("-", () => handleOperatorPress("-"), styles.opBtn)}
      </View>

      <View style={styles.row}>
        {renderButton("0", () => handleNumberPress("0"))}
        {renderButton("C", handleClear, styles.opBtn)}
        {renderButton("=", handleEqual, styles.opBtn)}
        {renderButton("+", () => handleOperatorPress("+"), styles.opBtn)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  display: {
    height: 100,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  displayText: {
    fontSize: 36,
    color: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  button: {
    flex: 1,
    margin: 5,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  opBtn: {
    backgroundColor: "#4a90e2",
  },
});

export default Ex8;
