import { createSlice } from "@reduxjs/toolkit";

const initialState: { value: number, numbers: number[] } = {
  value: 0,
  numbers: []
};

const counterSlice = createSlice({
    name: "counter",
    initialState: initialState,
    // Hàm xử lí các tác vụ đồng bộ (cập nhật state -> Không gọi API)
    reducers: {
        // Định nghĩa các phương thức đồng bộ
        increase(state) {
            state.value += 1;
        },
        decrease(state) {
            state.value -= 1;
        },
        createRandomNumber(state, action) {
            state.numbers.push(action.payload);
        }
    },
    // Hàm xử lí các tác vụ bất đồng bộ (cập nhật state -> Gọi API)
    extraReducers(builder) {

    }
});

// Export các thông tin của counterSlice ra bên ngoài
export default counterSlice.reducer;

// Export các phương thức đồng bộ
export const { increase, decrease, createRandomNumber } = counterSlice.actions;