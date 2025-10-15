import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../slices/counter.slice";
import positionSlice from "../slices/position.slice";
import randomSlice from "../slices/random.slice";
import viewModeSlice from "../slices/mode.slice";
import favouriteSlice from "../slices/favourite.slice";
import languageSlice from "../slices/language.slice";

// Khởi tạo store cho toàn bộ ứng dụng
const store = configureStore({
  reducer: {
    counter: counterSlice,
    position: positionSlice,
    random: randomSlice,
    viewMode: viewModeSlice,
    favourite: favouriteSlice,
    language: languageSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
