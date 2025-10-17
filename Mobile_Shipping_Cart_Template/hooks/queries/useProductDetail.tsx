import { useQuery } from "@tanstack/react-query";
import { getProductDetail } from "@/apis/products.api";

export const useProductDetail = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDetail(id),
  });
};
