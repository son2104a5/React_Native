import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import axios from "axios";
import { baseUrl } from "@/apis/baseUrl";

interface Position {
  id: number;
  name: string;
  isActive: boolean;
}

export default function PositionScreen() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get(baseUrl.defaults.baseURL + "/positions");
        setPositions(response.data.data || []);
      } catch (error) {
        console.error("Lỗi khi tải danh sách vị trí:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {positions.length === 0 ? (
        <View style={styles.center}>
          <Text>Danh sách vị trí trống.</Text>
        </View>
      ) : (
        positions.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text
              style={[
                styles.status,
                {
                  backgroundColor: item.isActive ? "#28a745" : "#dc3545",
                },
              ]}
            >
              {item.isActive ? "Đang hoạt động" : "Ngừng hoạt động"}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  status: {
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    alignSelf: "flex-start",
  },
});
