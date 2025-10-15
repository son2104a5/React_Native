import { createSlice } from "@reduxjs/toolkit";

interface RandomState {
  numbers: number[];
}

const initialState: RandomState = {
  numbers: [],
};

const randomSlice = createSlice({
  name: "random",
  initialState,
  reducers: {
    generateRandom(state) {
      const newNumber = Math.floor(Math.random() * 100);
      state.numbers.push(newNumber);
    },
    reset(state) {
      state.numbers = [];
    },
  },
});

export const { generateRandom, reset } = randomSlice.actions;
export default randomSlice.reducer;
