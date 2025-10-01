import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Ex1: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [savedName, setSavedName] = useState<string | null>(null);

  useEffect(() => {
    const loadName = async () => {
      try {
        const storedName = await AsyncStorage.getItem("userName");
        if (storedName) {
          setSavedName(storedName);
        }
      } catch (error) {
        console.error("Lỗi khi lấy tên:", error);
      }
    };
    loadName();
  }, []);

  const saveName = async () => {
    try {
      await AsyncStorage.setItem("userName", name);
      setSavedName(name);
    } catch (error) {
      console.error("Lỗi khi lưu tên:", error);
    }
  };

  return (
    <View style={styles.container}>
      {savedName ? (
        <Text style={styles.welcome}>Chào mừng trở lại, {savedName}!</Text>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Nhập tên của bạn"
            value={name}
            onChangeText={setName}
          />
          <Button title="Lưu" onPress={saveName} />
        </>
      )}
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
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: "100%",
  },
  welcome: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
  },
});

export default Ex1;
