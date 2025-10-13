import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function PositionItem({ item }: { item: any }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/BT/(tabs)/positions/${item.id}`)}
    >
      <Text style={styles.name}>{item.positionName}</Text>
      <Text
        style={[
          styles.status,
          item.positionStatus === "ACTIVE" ? styles.active : styles.inactive,
        ]}
      >
        {item.positionStatus === "ACTIVE"
          ? "Đang hoạt động"
          : "Ngừng hoạt động"}
      </Text>
      <TouchableOpacity
        style={styles.editBtn}
        onPress={() => router.push(`/BT/(tabs)/positions/edit/${item.id}`)}
      >
        <Ionicons name="pencil-outline" size={20} color="#007AFF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  name: { fontWeight: "bold", fontSize: 16, marginBottom: 5 },
  status: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
    color: "#fff",
  },
  active: { backgroundColor: "#28a745" },
  inactive: { backgroundColor: "#dc3545" },
  editBtn: { position: "absolute", top: 10, right: 10 },
});
