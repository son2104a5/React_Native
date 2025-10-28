import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Platform, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function Ex4() {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        setExpoPushToken(token);
        console.log("Expo Push Token:", token);
      }
    });
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert("Thông báo", "Không thể cấp quyền gửi thông báo!");
        return;
      }

      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("🎯 Expo Push Token:", token);
    } else {
      Alert.alert("Thông báo", "Bạn cần chạy ứng dụng trên thiết bị thật!");
    }

    return token;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expo Push Token</Text>
      {expoPushToken ? (
        <>
          <Text style={styles.token}>{expoPushToken}</Text>
          <Text style={styles.note}>
            👉 Copy token này và dán vào{" "}
            <Text style={{ fontWeight: "bold" }}>https://expo.dev/notifications</Text>{" "}
            để gửi thử thông báo.
          </Text>
        </>
      ) : (
        <Text style={styles.note}>Đang lấy token...</Text>
      )}
      <Button
        title="Lấy lại token"
        onPress={() =>
          registerForPushNotificationsAsync().then((t) => setExpoPushToken(t))
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fafc",
    padding: 20,
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  token: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  note: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
});
