// app/(tabs)/(tasks)/add.tsx
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import * as yup from "yup";
import TaskForm from "../../../components/TaskForm";
import { TaskFormData, TaskPriority } from "../../../types";
import { apiService } from "../../../services/api";

// Định nghĩa schema validation
const schema = yup.object().shape({
  name: yup
    .string()
    .required("Tên công việc là bắt buộc")
    .min(3, "Tên phải có ít nhất 3 ký tự"),
  priority: yup.string().oneOf(Object.values(TaskPriority)).required(),
  description: yup.string().optional(),
});

export default function AddTaskScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      priority: TaskPriority.Medium,
      description: "",
    },
  });

  // Submit function với API call
  const onSubmit = async (data: TaskFormData) => {
    try {
      setLoading(true);
      await apiService.createTask({
        name: data.name,
        priority: data.priority,
        status: "PENDING",
        description: data.description,
      });
      Alert.alert("Thành công", "Đã thêm công việc mới");
      router.back();
    } catch (error) {
      console.error("Error creating task:", error);
      Alert.alert("Lỗi", "Không thể thêm công việc mới");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TaskForm
      control={control}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
      loading={loading}
    />
  );
}
