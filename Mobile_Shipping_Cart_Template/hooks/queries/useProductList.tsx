import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/apis/products.api";

export const useProductList = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5,
  });
};
