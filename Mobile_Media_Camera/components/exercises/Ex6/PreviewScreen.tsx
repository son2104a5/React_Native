import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";

const CLOUD_NAME = "YOUR_CLOUD_NAME";
const UPLOAD_PRESET = "unsigned_upload";

export default function PreviewScreen() {
  const { uri } = useLocalSearchParams<{ uri: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUpload = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", {
        uri,
        type: "image/jpeg",
        name: "upload.jpg",
      } as any);
      formData.append("upload_preset", UPLOAD_PRESET);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("✅ URL:", res.data.secure_url);
      Alert.alert("Thành công", "Upload thành công!");
      router.replace("/select"); // trở về chọn ảnh
    } catch (err) {
      console.error(err);
      Alert.alert("Lỗi", "Upload thất bại! Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={styles.image} />

      {isLoading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={{ color: "#fff", marginTop: 10 }}>Đang upload...</Text>
        </View>
      )}

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#dc2626" }]}
          onPress={() => router.back()}
          disabled={isLoading}
        >
          <Ionicons name="camera-reverse" size={22} color="#fff" />
          <Text style={styles.text}>Chụp lại</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#16a34a" }]}
          onPress={handleUpload}
          disabled={isLoading}
        >
          <Ionicons name="cloud-upload-outline" size={22} color="#fff" />
          <Text style={styles.text}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  image: { width: "100%", height: "100%", resizeMode: "cover" },
  buttons: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  text: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
});
