import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  StyleSheet,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Settings {
  username: string;
  email: string;
  notificationsEnabled: boolean;
}

const STORAGE_KEY = "userSettings";

const Ex6: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    username: "Guest",
    email: "",
    notificationsEnabled: true,
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          setSettings(JSON.parse(saved));
        }
      } catch (e) {
        console.error("Lỗi load settings:", e);
      }
    };
    loadSettings();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateField = (field: keyof Settings, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetSettings = async () => {
    const defaultSettings: Settings = {
      username: "Guest",
      email: "",
      notificationsEnabled: true,
    };
    setSettings(defaultSettings);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSettings));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ Cài đặt</Text>

      <Text style={styles.label}>Tên hiển thị:</Text>
      <TextInput
        style={styles.input}
        value={settings.username}
        onChangeText={(text) => updateField("username", text)}
        placeholder="Nhập tên..."
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={settings.email}
        onChangeText={(text) => updateField("email", text)}
        placeholder="Nhập email..."
        keyboardType="email-address"
      />

      <View style={styles.switchRow}>
        <Text style={styles.label}>Nhận thông báo</Text>
        <Switch
          value={settings.notificationsEnabled}
          onValueChange={(val) => updateField("notificationsEnabled", val)}
        />
      </View>

      <Button title="Khôi phục mặc định" onPress={resetSettings} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  label: { fontSize: 16, marginTop: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
});

export default Ex6;
