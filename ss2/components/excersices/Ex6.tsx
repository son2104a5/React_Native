import React from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

const TodoApp = () => {
  // Danh sách công việc hardcode
  const tasks = [
    "Học React Native",
    "Làm bài tập về nhà",
    "Đi tập thể dục",
    "Đọc sách 30 phút",
    "Dọn phòng",
  ];

  return (
    <View style={styles.container}>
      {/* Ô nhập và nút thêm */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Nhập công việc..."
        />
        <Pressable style={styles.addButton}>
          <Text style={styles.addText}>Thêm</Text>
        </Pressable>
      </View>

      {/* Danh sách công việc */}
      <ScrollView style={styles.list}>
        {tasks.map((task, index) => (
          <View key={index} style={styles.taskItem}>
            <Text style={styles.taskText}>{task}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fafafa",
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#28a745",
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 8,
  },
  addText: {
    color: "#fff",
    fontWeight: "bold",
  },
  list: {
    flex: 1,
  },
  taskItem: {
    backgroundColor: "#e0f7fa",
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
  },
  taskText: {
    fontSize: 16,
    color: "#333",
  },
});

export default TodoApp;
