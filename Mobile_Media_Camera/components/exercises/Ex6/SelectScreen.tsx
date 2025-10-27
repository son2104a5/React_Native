import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function SelectScreen() {
  const router = useRouter();
  const [permissionStatus, setPermissionStatus] = useState<
    "granted" | "denied" | "undetermined"
  >("undetermined");

  // xin quyền truy cập thư viện
  const requestGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setPermissionStatus(status);
    if (status !== "granted") {
      Alert.alert("Cảnh báo", "Ứng dụng cần quyền truy cập thư viện!");
      return;
    }
    pickImage();
  };

  // chọn ảnh từ thư viện
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled && result.assets.length > 0) {
      router.push({
        pathname: "/preview",
        params: { uri: result.assets[0].uri },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn nguồn ảnh</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#2563eb" }]}
        onPress={() => router.push("/camera")}
      >
        <Ionicons name="camera-outline" size={24} color="#fff" />
        <Text style={styles.text}>Chụp ảnh</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#16a34a" }]}
        onPress={requestGalleryPermission}
      >
        <Ionicons name="images-outline" size={24} color="#fff" />
        <Text style={styles.text}>Chọn từ Thư viện</Text>
      </TouchableOpacity>

      {permissionStatus === "denied" && (
        <Text style={styles.warning}>
          ⚠️ Bạn đã từ chối quyền truy cập thư viện.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 30,
    gap: 10,
  },
  text: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  warning: { marginTop: 20, color: "red" },
});
