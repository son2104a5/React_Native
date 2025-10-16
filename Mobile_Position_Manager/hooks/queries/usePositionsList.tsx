import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import { getAllPosition, deletePosition } from "@/apis/position.api";

export const usePositionsList = () => {
  const queryClient = useQueryClient();

  // Lấy danh sách vị trí
  const query = useQuery({
    queryKey: ["positions"],
    queryFn: getAllPosition,
    staleTime: 1000 * 60 * 5, // cache 5 phút
  });

  // Mutation xóa vị trí
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deletePosition(id),
    onSuccess: () => {
      Alert.alert("Thành công", "Đã xóa vị trí thành công!");
      queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
    onError: (err: any) => {
      console.error("Delete error:", err);
      Alert.alert("Lỗi", err?.response?.data?.message || "Không thể xóa vị trí!");
    },
  });

  return {
    ...query,
    deletePosition: (id: number) => deleteMutation.mutate(id),
  };
};
