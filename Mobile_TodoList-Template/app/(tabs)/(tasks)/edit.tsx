import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Text, View, Alert } from "react-native";
import * as yup from "yup";
import TaskForm from "../../../components/TaskForm";
import { TaskFormData, TaskPriority } from "../../../types";
import { apiService } from "../../../services/api";

// Schema tương tự Add
const schema = yup.object().shape({
  name: yup
    .string()
    .required("Tên công việc là bắt buộc")
    .min(3, "Tên phải có ít nhất 3 ký tự"),
  priority: yup
    .mixed<TaskPriority>()
    .oneOf(Object.values(TaskPriority))
    .required(),
  description: yup.string().optional().nullable(),
});

export default function EditTaskScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // Lấy dữ liệu được truyền từ TaskListItem
  const params = useLocalSearchParams() as unknown as TaskFormData & {
    id: string;
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: params.name || "",
      priority: params.priority || TaskPriority.Medium,
      description: params.description || "",
    },
  });

  // Submit function với API call
  const onSubmit = async (data: TaskFormData) => {
    try {
      setLoading(true);
      await apiService.updateTask(parseInt(params.id), {
        name: data.name,
        priority: data.priority,
        status: "PENDING", // You might want to preserve the original status
        description: data.description,
      });
      Alert.alert("Thành công", "Đã cập nhật công việc");
      router.back();
    } catch (error) {
      console.error("Error updating task:", error);
      Alert.alert("Lỗi", "Không thể cập nhật công việc");
    } finally {
      setLoading(false);
    }
  };

  if (!params.id) {
    return (
      <View>
        <Text>Không tìm thấy công việc.</Text>
      </View>
    );
  }

  return (
    <TaskForm 
      control={control} 
      errors={errors} 
      onSubmit={handleSubmit(onSubmit)} 
      isEdit 
      loading={loading}
    />
  );
}
