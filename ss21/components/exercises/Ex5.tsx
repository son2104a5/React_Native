import React, { useEffect } from "react";
import { View, Button, Alert, StyleSheet } from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function Ex5() {
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data;
        console.log("👉 Data nhận được khi tap:", data);
      }
    );

    return () => subscription.remove();
  }, []);

  const handleScheduleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "⏰ Nhắc học React Native!",
        body: "Bắt đầu học ngay nào 💪",
        data: { studentId: "SV001", course: "React Native" },
      },
      trigger: { seconds: 10 },
    });

    Alert.alert("✅ Đã lên lịch nhắc nhở trong 10 giây!");
  };

  return (
    <View style={styles.container}>
      <Button title="Nhắc tôi sau 10 giây" onPress={handleScheduleNotification} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
