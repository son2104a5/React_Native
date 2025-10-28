import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function Ex3() {
  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Thông báo", "Bạn cần cấp quyền gửi thông báo để sử dụng tính năng này!");
      }
    };
    requestPermission();
  }, []);

  const scheduleReminder = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "⏰ Nhắc nhở!",
        body: "Đã đến lúc thực hiện công việc của bạn rồi 💪",
      },
      trigger: { seconds: 10 },
    });

    Alert.alert("Thành công", "Đã lên lịch nhắc nhở sau 10 giây.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông báo nhắc nhở</Text>
      <Button title="Nhắc tôi sau 10 giây" onPress={scheduleReminder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fafc",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
