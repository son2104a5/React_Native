import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  name: string;
  isFavorite: boolean;
}

interface FavoritesState {
  users: User[];
}

const initialState: FavoritesState = {
  users: [
    { id: 1, name: 'Nguyễn Văn A', isFavorite: true },
    { id: 2, name: 'Nguyễn Văn B', isFavorite: true },
    { id: 3, name: 'Nguyễn Văn C', isFavorite: false },
    { id: 4, name: 'Nguyễn Văn D', isFavorite: false },
    { id: 5, name: 'Trần Thị E', isFavorite: false },
  ],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const user = state.users.find(u => u.id === action.payload);
      if (user) {
        user.isFavorite = !user.isFavorite;
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
