import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Ex4: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [storedName, setStoredName] = useState<string | null>(null);

  useEffect(() => {
    const loadName = async () => {
      const savedName = await AsyncStorage.getItem("userName");
      if (savedName) setStoredName(savedName);
    };
    loadName();
  }, []);

  const saveName = async () => {
    await AsyncStorage.setItem("userName", name);
    setStoredName(name);
    setName("");
  };

  const removeName = async () => {
    await AsyncStorage.removeItem("userName");
    setStoredName(null);
  };

  return (
    <View style={styles.container}>
      {storedName ? (
        <View>
          <Text style={styles.welcome}>Chào mừng trở lại, {storedName}!</Text>
          <Button title="Quên tôi" onPress={removeName} />
        </View>
      ) : (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Nhập tên của bạn"
            value={name}
            onChangeText={setName}
          />
          <Button title="Lưu" onPress={saveName} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    width: 200,
  },
  welcome: { fontSize: 20, marginBottom: 10 },
});

export default Ex4;
