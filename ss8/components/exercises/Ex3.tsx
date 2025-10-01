import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Ex3: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const loadCount = async () => {
      try {
        const storedValue = await AsyncStorage.getItem("counter");
        if (storedValue !== null) {
          setCount(Number(storedValue));
        }
      } catch (error) {
        console.error("Lỗi khi load counter:", error);
      }
    };
    loadCount();
  }, []);

  const saveCount = async (newValue: number) => {
    try {
      setCount(newValue);
      await AsyncStorage.setItem("counter", newValue.toString());
    } catch (error) {
      console.error("Lỗi khi lưu counter:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bộ đếm</Text>
      <Text style={styles.count}>{count}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Giảm" onPress={() => saveCount(count - 1)} />
        <Button title="Tăng" onPress={() => saveCount(count + 1)} />
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
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  count: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
  },
});

export default Ex3;
