import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function EditPosition() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [positionName, setPositionName] = useState("");
  const [description, setDescription] = useState("");
  const [positionStatus, setPositionStatus] = useState("ACTIVE");
  const [loading, setLoading] = useState(true);

  const token = "eyFakeTokenExample123";

  useEffect(() => {
    axios
      .get(`https://nest-api-public.ixe-agent.io.vn/api/v1/positions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data;
        setPositionName(data.positionName);
        setDescription(data.description);
        setPositionStatus(data.positionStatus);
      })
      .catch(() => Alert.alert("Lỗi", "Không thể tải dữ liệu vị trí"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdate = async () => {
    if (!positionName.trim())
      return Alert.alert("Lỗi", "Tên vị trí không được để trống");
    if (!positionStatus.trim())
      return Alert.alert("Lỗi", "Trạng thái không được để trống");

    try {
      await axios.put(
        `https://nest-api-public.ixe-agent.io.vn/api/v1/positions/${id}`,
        {
          positionName,
          description,
          positionStatus,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Alert.alert("Thành công", "Cập nhật vị trí thành công!");
      router.back();
    } catch (error: any) {
      console.log(error.response?.data);
      Alert.alert(
        "Lỗi",
        error.response?.data?.message || "Không thể cập nhật vị trí"
      );
    }
  };

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên vị trí</Text>
      <TextInput
        style={styles.input}
        value={positionName}
        onChangeText={setPositionName}
        placeholder="Nhập tên vị trí"
      />

      <Text style={styles.label}>Mô tả</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Nhập mô tả"
      />

      <Text style={styles.label}>Trạng thái</Text>
      <TextInput
        style={styles.input}
        value={positionStatus}
        onChangeText={setPositionStatus}
        placeholder="ACTIVE / INACTIVE"
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>CẬP NHẬT VỊ TRÍ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "white" },
  label: { fontWeight: "600", marginTop: 10 },
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
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
