import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import * as yup from "yup";
import TaskForm from "../../../components/TaskForm";
import { TaskFormData, TaskPriority } from "../../../types";

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

  // Giả lập hàm submit
  const onSubmit = handleSubmit((data: TaskFormData) => {
    console.log("Dữ liệu cập nhật (ID: " + params.id + "):", data);
    router.back();
  });

  if (!params.id) {
    return (
      <View>
        <Text>Không tìm thấy công việc.</Text>
      </View>
    );
  }

  return (
    <TaskForm control={control} errors={errors} onSubmit={onSubmit} isEdit />
  );
}
