import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const NameInput = () => {
  const [name, setName] = useState("");

  return (
    <View style={styles.container}>
      {/* Nhãn */}
      <Text style={styles.label}>Họ và tên:</Text>

      {/* Ô nhập liệu */}
      <TextInput
        style={styles.input}
        placeholder="Nhập tên của bạn..."
        value={name}
        onChangeText={setName}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
});

export default NameInput;
