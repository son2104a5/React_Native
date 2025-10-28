import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform, Alert } from "react-native";

const TOKEN_KEY = "@expo_push_token";

export async function registerForPushNotificationsAsync() {
  try {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("reminders", {
        name: "Nhắc nhở",
        importance: Notifications.AndroidImportance.HIGH,
      });
      await Notifications.setNotificationChannelAsync("news", {
        name: "Tin tức",
        importance: Notifications.AndroidImportance.DEFAULT,
      });
    }

    if (!Device.isDevice) {
      Alert.alert("Thông báo chỉ hoạt động trên thiết bị thật!");
      return null;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert("Không có quyền thông báo!");
      return null;
    }

    const storedToken = await AsyncStorage.getItem(TOKEN_KEY);

    const tokenResponse = await Notifications.getExpoPushTokenAsync({
      projectId: "d48dc9bf-24d3-42e6-8200-e2e5c185c8ae",
    });
    const newToken = tokenResponse.data;

    console.log("🔹 Token mới lấy:", newToken);
    console.log("🔹 Token đã lưu:", storedToken);

    if (!storedToken || storedToken !== newToken) {
      await AsyncStorage.setItem(TOKEN_KEY, newToken);
      console.log("✅ Token mới đã lưu / cập nhật vào AsyncStorage");

    } else {
      console.log("ℹ️ Token không thay đổi, bỏ qua cập nhật");
    }

    return newToken;
  } catch (error) {
    console.error("❌ Lỗi khi đăng ký thông báo:", error);
    return null;
  }
}
