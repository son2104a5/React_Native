// CurrencyInput.js
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface PropTypes {
    label: string;
    value: any;
    onChange: any;
}

const CurrencyInput = ({ label, value, onChange }: PropTypes) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
});

export default CurrencyInput;
