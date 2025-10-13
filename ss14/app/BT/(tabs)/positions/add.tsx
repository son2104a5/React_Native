import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

export default function AddPosition() {
  const [positionName, setPositionName] = useState("");
  const [description, setDescription] = useState("");
  const [positionStatus, setPositionStatus] = useState("ACTIVE");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!positionName.trim()) return Alert.alert("Lỗi", "Tên vị trí không được để trống");

    try {
      await axios.post("https://nest-api-public.ixe-agent.io.vn/api/v1/positions", {
        positionName,
        positionStatus,
        description,
      });
      console.log("111111111111");
      
      Alert.alert("Thành công", "Thêm vị trí mới thành công!");
      router.back();
    } catch (error: any) {
      Alert.alert("Lỗi", error.response?.data?.message || "Không thể thêm vị trí");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên vị trí</Text>
      <TextInput style={styles.input} value={positionName} onChangeText={setPositionName} placeholder="Nhập tên vị trí" />

      <Text style={styles.label}>Mô tả</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Nhập mô tả" />

      <Text style={styles.label}>Trạng thái</Text>
      <TextInput style={styles.input} editable={false} value="Đang hoạt động" />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>THÊM VÀO VỊ TRÍ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "white" },
  label: { fontWeight: "500", marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: { color: "white", textAlign: "center", fontWeight: "bold" },
});
