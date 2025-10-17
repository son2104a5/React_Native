import axiosInstance from "@/utils/axiosInstance";

export const getCart = async () => {
  const response = await axiosInstance.get("/cart");
  return response.data.data;
};

export const addToCart = async (productId: string, quantity: number = 1) => {
  const response = await axiosInstance.post("/cart", { productId, quantity });
  return response.data.data;
};

export const updateCartItem = async (productId: string, quantity: number) => {
  const response = await axiosInstance.put(`/cart/${productId}`, { quantity });
  return response.data.data;
};

export const removeCartItem = async (productId: string) => {
  const response = await axiosInstance.delete(`/cart/${productId}`);
  return response.data.data;
};

export const clearCart = async () => {
  const response = await axiosInstance.delete("/cart");
  return response.data.data;
};
