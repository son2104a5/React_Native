import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import axios from "axios";
import { updatePosition } from "@/apis/position.api";
import { PositionResponse } from "@/types";

export const useUpdatePosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: PositionResponse }) => {
      return await updatePosition(id, data);
    },

    onSuccess: (response) => {
      Alert.alert("Thành công", response.message || "Cập nhật thành công!");
      queryClient.invalidateQueries({ queryKey: ["positions"] });
    },

    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        Alert.alert("Cảnh báo", error?.response?.data?.message);
      } else {
        Alert.alert("Lỗi", "Không thể cập nhật vị trí!");
      }
    },
  });
};
