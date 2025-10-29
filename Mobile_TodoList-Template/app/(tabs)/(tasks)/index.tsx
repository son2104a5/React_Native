import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  Button,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import TaskListItem from "../../../components/TaskListItem";
import { Task, TaskStatus } from "../../../types";
import { apiService } from "../../../services/api";

export default function TaskListScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  // State để quản lý dữ liệu và modal
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Load tasks from API
  const loadTasks = async () => {
    try {
      setLoading(true);
      const tasksData = await apiService.getAllTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error('Error loading tasks:', error);
      Alert.alert('Lỗi', 'Không thể tải danh sách công việc');
    } finally {
      setLoading(false);
    }
  };

  // Refresh tasks
  const onRefresh = async () => {
    setRefreshing(true);
    await loadTasks();
    setRefreshing(false);
  };

  // Load tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  // Thêm nút "Thêm mới" (+) vào header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => router.push("/(tabs)/(tasks)/add")}>
          <Ionicons
            name="add-circle"
            size={30}
            color="#007AFF"
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, router]);

  // --- Các hàm xử lý API ---

  const handleToggleStatus = async (id: number) => {
    try {
      const task = tasks.find(t => t.id === id);
      if (!task) return;

      const updatedTask = {
        name: task.name,
        priority: task.priority,
        status: task.status === TaskStatus.Completed ? TaskStatus.Pending : TaskStatus.Completed,
        description: task.description,
      };

      await apiService.updateTask(id, updatedTask);
      await loadTasks(); // Reload tasks to get updated data
    } catch (error) {
      console.error('Error updating task status:', error);
      Alert.alert('Lỗi', 'Không thể cập nhật trạng thái công việc');
    }
  };

  const openDeleteModal = (id: number) => {
    setSelectedTaskId(id);
    setModalVisible(true);
  };

  const handleDeleteTask = async () => {
    if (selectedTaskId) {
      try {
        await apiService.deleteTask(selectedTaskId);
        await loadTasks(); // Reload tasks after deletion
        setModalVisible(false);
        setSelectedTaskId(null);
      } catch (error) {
        console.error('Error deleting task:', error);
        Alert.alert('Lỗi', 'Không thể xóa công việc');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Đang tải...</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <TaskListItem
              task={item}
              onToggleStatus={handleToggleStatus}
              onDelete={openDeleteModal}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Chưa có công việc nào</Text>
            </View>
          }
        />
      )}

      {/* Modal xác nhận xóa */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Bạn có chắc chắn muốn xóa công việc này?
            </Text>
            <View style={styles.modalButtons}>
              <Button title="Hủy" onPress={() => setModalVisible(false)} />
              <Pressable style={styles.deleteButton} onPress={handleDeleteTask}>
                <Text style={styles.deleteButtonText}>Xóa</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ... (Styles cho màn hình List và Modal)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f8",
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  deleteButton: {
    backgroundColor: "red",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
    marginLeft: 15,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
