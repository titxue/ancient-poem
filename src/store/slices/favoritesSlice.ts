import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Poem } from '../../types/poem';

interface FavoritesState {
  items: Poem[];
  loading: boolean;
  error: string | null;
}

const STORAGE_KEY = 'ancient-poem-favorites';

const loadFavoritesFromStorage = (): Poem[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load favorites from storage:', error);
    return [];
  }
};

const saveFavoritesToStorage = (favorites: Poem[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Failed to save favorites to storage:', error);
  }
};

const initialState: FavoritesState = {
  items: loadFavoritesFromStorage(),
  loading: false,
  error: null,
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Poem>) => {
      if (!state.items.some(item => item.id === action.payload.id)) {
        state.items.push(action.payload);
        saveFavoritesToStorage(state.items);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveFavoritesToStorage(state.items);
    },
    clearFavorites: (state) => {
      state.items = [];
      saveFavoritesToStorage(state.items);
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;

export const selectFavorites = (state: { favorites: FavoritesState }) => state.favorites.items;
export const selectIsFavorite = (state: { favorites: FavoritesState }, id: number) =>
  state.favorites.items.some(item => item.id === id);

export default favoritesSlice.reducer; 