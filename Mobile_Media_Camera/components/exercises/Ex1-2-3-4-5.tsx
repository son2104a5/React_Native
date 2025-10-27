import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";

const CLOUD_NAME = "YOUR_CLOUD_NAME"; // 🔹 thay bằng Cloudinary name của em
const UPLOAD_PRESET = "unsigned_upload"; // 🔹 preset unsigned đã tạo

export default function CameraUploadScreen() {
  const [permissionStatus, setPermissionStatus] = useState<
    "granted" | "denied" | "undetermined"
  >("undetermined");
  const [photo, setPhoto] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const cameraRef = useRef<Camera | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.getCameraPermissionsAsync();
      setPermissionStatus(status);
    })();
  }, []);

  const requestPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setPermissionStatus(status);
  };

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      const result = await cameraRef.current.takePictureAsync({ quality: 0.7 });
      setPhoto(result);
    }
  };

  const handleRetake = () => {
    setPhoto(null);
  };

  const handleUpload = async () => {
    if (!photo) return;
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", {
        uri: photo.uri,
        type: "image/jpeg",
        name: "upload.jpg",
      } as any);
      formData.append("upload_preset", UPLOAD_PRESET);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("✅ secure_url:", res.data.secure_url);
      Alert.alert("Thành công", "Upload thành công!");
      setPhoto(null); // trở về chế độ camera
      router.replace("/"); // hoặc router.back() nếu muốn quay lại trang trước
    } catch (error: any) {
      console.error("❌ Upload lỗi:", error?.response || error);
      Alert.alert("Upload thất bại!", "Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  if (permissionStatus !== "granted") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Ứng dụng Camera</Text>
        <Button title="Yêu cầu quyền Camera" onPress={requestPermission} />
        <Text style={styles.status}>
          Trạng thái:{" "}
          {permissionStatus === "denied"
            ? "🚫 Đã từ chối"
            : "❔ Chưa xác định"}
        </Text>
      </View>
    );
  }

  if (photo) {
    return (
      <View style={styles.previewContainer}>
        <Image source={{ uri: photo.uri }} style={styles.previewImage} />

        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={{ color: "#fff", marginTop: 10 }}>
              Đang upload ảnh...
            </Text>
          </View>
        )}

        <View style={styles.previewButtons}>
          <TouchableOpacity
            style={[styles.retakeButton, isLoading && styles.disabledButton]}
            onPress={handleRetake}
            disabled={isLoading}
          >
            <Ionicons name="camera-reverse" size={24} color="#fff" />
            <Text style={styles.buttonText}>Chụp lại</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.continueButton, isLoading && styles.disabledButton]}
            onPress={handleUpload}
            disabled={isLoading}
          >
            <Ionicons name="cloud-upload-outline" size={24} color="#fff" />
            <Text style={styles.buttonText}>Tiếp tục</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.cameraContainer}>
      <Camera style={styles.camera} ref={cameraRef} />
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.captureButton} onPress={handleTakePicture}>
          <Ionicons name="camera" size={30} color="#fff" />
          <Text style={styles.captureText}>Chụp ảnh</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Phần yêu cầu quyền
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  status: { marginTop: 15, fontSize: 16 },

  // Camera view
  cameraContainer: { flex: 1, position: "relative" },
  camera: { flex: 1 },
  overlay: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
  captureButton: {
    backgroundColor: "#1e40af",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  captureText: { color: "#fff", fontSize: 16, fontWeight: "bold" },

  // Preview
  previewContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  previewButtons: {
    position: "absolute",
    bottom: 40,
    flexDirection: "row",
    gap: 20,
  },
  retakeButton: {
    backgroundColor: "#dc2626",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  continueButton: {
    backgroundColor: "#16a34a",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  disabledButton: { opacity: 0.6 },

  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
