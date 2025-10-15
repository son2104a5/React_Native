import { createSlice } from '@reduxjs/toolkit';

interface ViewState {
  mode: 'list' | 'grid';
}

const initialState: ViewState = {
  mode: 'list',
};

const viewModeSlice = createSlice({
  name: 'viewMode',
  initialState,
  reducers: {
    setListMode: (state) => {
      state.mode = 'list';
    },
    setGridMode: (state) => {
      state.mode = 'grid';
    },
  },
});

export const { setListMode, setGridMode } = viewModeSlice.actions;
export default viewModeSlice.reducer;
