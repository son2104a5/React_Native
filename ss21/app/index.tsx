import { View, Button, Alert, StyleSheet } from "react-native";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "@/components/exercises/Ex7";

export default function HomeScreen() {
  const handleSendNotification = async () => {
    await registerForPushNotificationsAsync();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "📰 Thông báo mới!",
        body: "Nhấn để xem chi tiết Item 123",
        data: { screen: "Details", itemId: 123 },
      },
      trigger: null,
      channelId: "reminders",
    });

    Alert.alert("✅ Đã gửi thông báo!");
  };

  const handleGetToken = async () => {
    const token = await registerForPushNotificationsAsync();
    if (token) Alert.alert("Expo Push Token", token);
  };

  return (
    <View style={styles.container}>
      <Button title="Gửi Local Notification" onPress={handleSendNotification} />

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button title="Đăng ký và lưu ExpoPushToken" onPress={handleGetToken} />
      </View>
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
