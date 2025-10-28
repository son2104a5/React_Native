import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform, Alert } from "react-native";

export async function Ex6() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("reminders", {
      name: "Nhắc nhở",
      importance: Notifications.AndroidImportance.HIGH,
      sound: 'true',
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });

    await Notifications.setNotificationChannelAsync("news", {
      name: "Tin tức",
      importance: Notifications.AndroidImportance.DEFAULT,
      sound: 'false',
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
      Alert.alert("Quyền bị từ chối", "Không thể nhận thông báo!");
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Expo Push Token:", token);
  } else {
    Alert.alert("Lưu ý", "Bạn cần chạy trên thiết bị thật để nhận thông báo!");
  }

  return token;
}
