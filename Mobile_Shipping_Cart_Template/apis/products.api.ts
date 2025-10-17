import axiosInstance from "@/utils/axiosInstance";

export const getProducts = async () => {
  const response = await axiosInstance.get("/products");
  return response.data.data;
};

export const getProductDetail = async (id: string) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data.data;
};
