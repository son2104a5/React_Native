import React, { useState, useEffect } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { useDebounce } from "./useDebound";

const Ex8 = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      console.log("🔍 Gọi API với từ khóa:", debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tìm kiếm:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập từ khóa..."
        value={query}
        onChangeText={setQuery}
      />
      <Text style={styles.result}>
        Giá trị debounce: {debouncedQuery}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  result: {
    fontSize: 16,
    color: "#333",
  },
});

export default Ex8;
