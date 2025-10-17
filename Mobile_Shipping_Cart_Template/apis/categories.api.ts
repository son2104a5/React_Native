import axiosInstance from "@/utils/axiosInstance";

export const CategoryList = async () => {
    const response = await axiosInstance.get("/categories");
    return response.data;
}