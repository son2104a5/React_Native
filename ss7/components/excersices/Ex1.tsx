import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Ex1: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Giá trị hiện tại: {count}</Text>
      <View style={styles.buttonRow}>
        <Button title="Giảm" onPress={() => setCount(count - 1)} />
        <View style={{ width: 20 }} />
        <Button title="Tăng" onPress={() => setCount(count + 1)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },    
  buttonRow: {
    flexDirection: "row",
  },
});

export default Ex1;
