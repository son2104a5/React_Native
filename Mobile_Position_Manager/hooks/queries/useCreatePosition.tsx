import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import { createPosition } from "@/apis/position.api";
import axios from "axios";

export const useCreatePosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPosition,
    onSuccess: (data) => {
      Alert.alert("Thành công", data.message || "Thêm vị trí thành công!");
      queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        Alert.alert("Cảnh báo", error?.response?.data?.message);
      }
    },
  });
};
