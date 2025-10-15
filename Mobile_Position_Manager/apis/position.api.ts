import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Gọi API lấy danh sách vị trí
export const getPositions = createAsyncThunk("position/getPositions", async () => {
    const response = await axiosInstance.get("/positions");
    return response.data;
});