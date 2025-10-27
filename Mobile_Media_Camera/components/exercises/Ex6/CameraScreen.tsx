import React, { useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function CameraScreen() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef<Camera | null>(null);
  const router = useRouter();

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Ứng dụng cần quyền Camera để chụp ảnh</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text style={styles.link}>Cấp quyền</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      router.push({
        pathname: "/preview",
        params: { uri: photo.uri },
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} ref={cameraRef} />
      <View style={styles.captureContainer}>
        <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
          <Ionicons name="camera" size={30} color="#fff" />
          <Text style={styles.captureText}>Chụp ảnh</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  link: { color: "#2563eb", fontSize: 16, marginTop: 10 },
  captureContainer: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
  captureButton: {
    backgroundColor: "#1e40af",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  captureText: { color: "#fff", fontWeight: "bold" },
});
