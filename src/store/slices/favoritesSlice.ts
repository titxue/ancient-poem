import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import type { Poem } from '../../types/poem';
import { loadFavorites, saveFavorites } from '../../utils/storage';

interface FavoritesState {
  items: Poem[];
}

const initialState: FavoritesState = {
  items: loadFavorites(),
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Poem>) => {
      state.items.push(action.payload);
      saveFavorites(state.items);
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(poem => poem.id !== action.payload);
      saveFavorites(state.items);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export const selectFavorites = (state: RootState) => state.favorites.items;
export const selectIsFavorite = (state: RootState, poemId: number) =>
  state.favorites.items.some(poem => poem.id === poemId);

export default favoritesSlice.reducer; 