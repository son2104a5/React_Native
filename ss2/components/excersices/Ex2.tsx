import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const CounterApp = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      {/* Số hiển thị */}
      <Text style={styles.counter}>{count}</Text>

      {/* Nhóm nút tăng/giảm */}
      <View style={styles.buttonRow}>
        <Button title="Tăng" onPress={() => setCount(count + 1)} />
        <Button title="Giảm" onPress={() => setCount(count - 1)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // chiếm full màn
    justifyContent: "center", // căn dọc giữa
    alignItems: "center", // căn ngang giữa
    backgroundColor: "#f5f5f5",
  },
  counter: {
    fontSize: 64,
    fontWeight: "bold",
    marginBottom: 40,
  },
  buttonRow: {
    flexDirection: "row", // đặt nút cạnh nhau
    gap: 20, // khoảng cách giữa nút (React Native 0.71+ mới support, cũ thì dùng margin)
  },
});

export default CounterApp;
