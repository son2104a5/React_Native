import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import DeleteModal from "../../../../components/DeleteModel";
import { Ionicons } from "@expo/vector-icons";

export default function PositionList() {
  const [positions, setPositions] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const token = "eyFakeTokenExample123"; // giả lập token

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://nest-api-public.ixe-agent.io.vn/api/v1/positions",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPositions(res.data);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể tải danh sách vị trí");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await axios.delete(
        `https://nest-api-public.ixe-agent.io.vn/api/v1/positions/${selectedId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setShowModal(false);
      setSelectedId(null);
      Alert.alert("Thành công", "Đã xóa vị trí");
      fetchData();
    } catch (error: any) {
      Alert.alert(
        "Lỗi",
        error.response?.data?.message || "Không thể xóa vị trí"
      );
    }
  };

  return (
    <View style={styles.container}>
      {positions.length === 0 ? (
        <Text style={{ color: "#888", textAlign: "center", marginTop: 20 }}>
          Danh sách vị trí trống.
        </Text>
      ) : (
        <FlatList
          data={positions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View>
                <Text style={styles.name}>{item.positionName}</Text>
                <Text
                  style={[
                    styles.status,
                    {
                      color: item.positionStatus === "ACTIVE" ? "green" : "red",
                    },
                  ]}
                >
                  {item.positionStatus === "ACTIVE"
                    ? "Đang hoạt động"
                    : "Ngừng hoạt động"}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  setSelectedId(item.id);
                  setShowModal(true);
                }}
              >
                <Ionicons name="trash-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <DeleteModal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: {
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  name: { fontSize: 16, fontWeight: "600" },
  status: { fontSize: 13, marginTop: 4 },
});
