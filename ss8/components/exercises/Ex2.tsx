import React, { useState, useEffect } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Ex2: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const loadDarkMode = async () => {
      try {
        const storedValue = await AsyncStorage.getItem("darkMode");
        if (storedValue !== null) {
          setIsDarkMode(JSON.parse(storedValue));
        }
      } catch (error) {
        console.error("Lỗi khi load chế độ ban đêm:", error);
      }
    };
    loadDarkMode();
  }, []);

  const toggleDarkMode = async (value: boolean) => {
    try {
      setIsDarkMode(value);
      await AsyncStorage.setItem("darkMode", JSON.stringify(value));
    } catch (error) {
      console.error("Lỗi khi lưu chế độ ban đêm:", error);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#222" : "#fff" },
      ]}
    >
      <Text style={[styles.text, { color: isDarkMode ? "#fff" : "#000" }]}>
        Chế độ ban đêm
      </Text>
      <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
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
    marginBottom: 10,
  },
});

export default Ex2;
