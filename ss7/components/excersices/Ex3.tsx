import React, { useRef } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const Ex3: React.FC = () => {
  const inputRef = useRef<TextInput>(null);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Nhập gì đó..."
      />
      <Button title="Focus vào ô nhập liệu" onPress={handleFocus} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    padding: 10,
    width: "100%",
    marginBottom: 20,
  },
});

export default Ex3;
