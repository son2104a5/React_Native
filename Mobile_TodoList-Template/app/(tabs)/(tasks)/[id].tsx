// app/(tabs)/(tasks)/[id].tsx
import { useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View, ActivityIndicator, Alert } from "react-native";
import { Task, getStatusDisplayText } from "../../../types";
import { apiService } from "../../../services/api";

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTask = async () => {
      try {
        setLoading(true);
        const tasks = await apiService.getAllTasks();
        const foundTask = tasks.find(t => t.id === parseInt(id || '0'));
        setTask(foundTask || null);
      } catch (error) {
        console.error('Error loading task:', error);
        Alert.alert('Lỗi', 'Không thể tải thông tin công việc');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadTask();
    }
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Đang tải...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!task) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Không tìm thấy công việc.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{task.name}</Text>

        <View style={styles.detailItem}>
          <Text style={styles.label}>Trạng thái:</Text>
          <Text
            style={[
              styles.value,
              { color: task.status === "COMPLETED" ? "green" : "orange" },
            ]}
          >
            {getStatusDisplayText(task.status)}
          </Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.label}>Độ ưu tiên:</Text>
          <Text style={styles.value}>{task.priority}</Text>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.label}>Mô tả:</Text>
          <Text style={styles.descriptionText}>{task.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
// ... (Styles cho màn Chi tiết)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#111",
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: {
    fontSize: 16,
    color: "#555",
    fontWeight: "500",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
  },
  descriptionContainer: {
    marginTop: 20,
  },
  descriptionText: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
    marginTop: 8,
  },
  errorText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "red",
  },
});
