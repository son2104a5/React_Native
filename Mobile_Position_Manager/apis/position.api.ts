// ss16 (redux toolkit)
// import { PositionResponse } from "@/types";
// import axiosInstance from "@/utils/axiosInstance";
// import { createAsyncThunk } from "@reduxjs/toolkit";

// // Gọi API lấy danh sách vị trí
// export const getPositions = createAsyncThunk("position/getPositions", async () => {
//     const response = await axiosInstance.get("/positions");
//     return response.data;
// });

// // Hàm xóa thông tin vị trí
// export const deletePosition = createAsyncThunk("position/deletePosition", async (id: number) => {
//     await axiosInstance.delete(`/positions/${id}`);
//     return id;
// });

// export const createPosition = createAsyncThunk("position/createPosition", async (createPosition: PositionResponse) => {
//     const response = await axiosInstance.post("/positions", createPosition);
//     return response.data;
// });

// ss17 (tanstack)
import { PositionResponse } from "@/types";
import axiosInstance from "@/utils/axiosInstance";

// Gọi API lấy danh sách vị trí
export const getAllPosition = async () => {
    const response = await axiosInstance.get("/positions");
    return response.data;
};

// Gọi API lây thông tin chi tiết vị trí
export const getPositionDetail = async (id: number) => {
    const response = await axiosInstance.get(`/positions/${id}`);
    return response.data;
}

// Hàm xóa thông tin vị trí
export const deletePosition = async (id: number) => {
    const response = await axiosInstance.delete(`/positions/${id}`);
    return response.data;
};

export const createPosition =  async (createPosition: PositionResponse) => {
    const response = await axiosInstance.post("/positions", createPosition);
    return response.data;
};

export const updatePosition = async (id: number, updatePosition: PositionResponse) => {
    const response = await axiosInstance.put(`/positions/${id}`, updatePosition);
    return response.data;
}