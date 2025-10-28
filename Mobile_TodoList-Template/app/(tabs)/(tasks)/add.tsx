// app/(tabs)/(tasks)/add.tsx
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import TaskForm from "../../../components/TaskForm";
import { TaskFormData, TaskPriority } from "../../../types";

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

  // Giả lập hàm submit
  const onSubmit = (data: TaskFormData) => {
    console.log("Dữ liệu thêm mới:", data);
    // Đây là UI, nên chỉ đóng modal
    router.back();
  };

  return (
    <TaskForm
      control={control}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}
