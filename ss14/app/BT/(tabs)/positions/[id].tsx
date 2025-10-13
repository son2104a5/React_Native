import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";

export default function PositionDetail() {
  const { id } = useLocalSearchParams();
  const [position, setPosition] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const token = "eyFakeExampleToken123"; // token fake

  useEffect(() => {
    axios
      .get(`https://nest-api-public.ixe-agent.io.vn/api/v1/positions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPosition(res.data))
      .catch(() => setPosition(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );

  if (!position)
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Không tìm thấy vị trí.</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên vị trí:</Text>
      <Text style={styles.value}>{position.positionName}</Text>

      <Text style={styles.label}>Trạng thái:</Text>
      <Text
        style={[
          styles.status,
          position.positionStatus === "ACTIVE" ? styles.active : styles.inactive,
        ]}
      >
        {position.positionStatus === "ACTIVE"
          ? "Đang hoạt động"
          : "Ngừng hoạt động"}
      </Text>

      <Text style={styles.label}>Mô tả:</Text>
      <Text style={styles.value}>{position.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  label: { fontWeight: "600", marginTop: 10 },
  value: { marginBottom: 5, fontSize: 16 },
  status: {
    color: "white",
    fontWeight: "500",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  active: { backgroundColor: "green" },
  inactive: { backgroundColor: "red" },
  notFound: { color: "red", fontSize: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
