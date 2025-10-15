import { createSlice } from '@reduxjs/toolkit';

interface LanguageState {
  language: 'en' | 'vi';
}

const initialState: LanguageState = {
  language: 'vi',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    toggleLanguage: (state) => {
      state.language = state.language === 'vi' ? 'en' : 'vi';
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { toggleLanguage, setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
