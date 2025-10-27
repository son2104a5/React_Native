import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function CloudinaryUploaderScreen() {
  const [pickerMediaUri, setPickerMediaUri] = useState<null | string>(null);
  const [mediaType, setMediaType] = useState<
    "image" | "video" | "livePhoto" | "pairedVideo" | undefined
  >("image");
  // Chọn ảnh hoặc video từ thư viện
  const pickMediaFromLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos", "livePhotos"],
      allowsEditing: true, // Cho phép chỉnh sửa ảnh
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Lấy ra uri của ảnh
      setPickerMediaUri(result.assets[0].uri);

      // Lấy ra loại file
      setMediaType(result.assets[0].type);
    }
  };

  // Chọn từ camera
  const pickMediaFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync(); // Xin quyền truy cập vào camera

    if (status !== ImagePicker.PermissionStatus.GRANTED) {
      Alert.alert(
        "Thông báo",
        "Bạn cần cấp quyền truy cập camera để thực hieẹn chức năng này"
      );
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images", "videos", "livePhotos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Lấy ra uri của ảnh
      setPickerMediaUri(result.assets[0].uri);

      // Lấy ra loại file
      setMediaType(result.assets[0].type);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Upload Media lên Cloudinary</Text>

      <View style={styles.buttonGroup}>
        <Button title="Chọn từ Thư viện" />
        <Button title="Chụp/Quay với Camera" />
      </View>

      <View style={styles.previewContainer}>
        {pickerMediaUri && (
          <>
            <Text style={styles.previewTitle}>Tài nguyên đã chọn/chụp:</Text>
            {mediaType === "image" ? (
              <Image
                source={{ uri: pickerMediaUri }}
                style={styles.mediaPreview}
                height={250}
                width={250}
              />
            ) : (
              <Text>{pickerMediaUri}</Text>
            )}
            <View style={styles.videoPlaceholder}>
              <Text style={styles.videoText}>Video đã chọn</Text>
              <Text style={styles.videoUriText}>conmeo.mp4</Text>
            </View>
          </>
        )}
        <Button title={"Tải lên Cloudinary"} color="#28a745" />
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ marginTop: 10 }}
        />
      </View>

      <View style={styles.uploadResultContainer}>
        <Text style={styles.previewTitle}>URL Cloudinary:</Text>
        <Text style={styles.uploadedUrl}>conmeo.mp4</Text>
        hiển thị liên kết
        <Button title="Mở Video trên Cloudinary" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 30,
  },
  previewContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#555",
  },
  mediaPreview: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#eee",
  },
  videoPlaceholder: {
    width: 250,
    height: 250,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
  },
  videoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
  },
  videoUriText: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  uploadResultContainer: {
    width: "90%",
    backgroundColor: "#e6ffe6",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#aaffaa",
  },
  uploadedUrl: {
    color: "#007AFF",
    textDecorationLine: "underline",
    marginTop: 10,
    marginBottom: 15,
    textAlign: "center",
    fontSize: 14,
  },
  uploadedImagePreview: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    borderRadius: 8,
    marginTop: 10,
  },
});
