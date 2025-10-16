import { useQuery } from "@tanstack/react-query";
import { getPositionDetail } from "@/apis/position.api";

export const usePositionDetails = (id?: number) => {
  return useQuery({
    queryKey: ["position", id],
    queryFn: () => getPositionDetail(id!),
    enabled: !!id, // chỉ gọi khi có id
  });
};
