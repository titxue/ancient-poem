import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import type { Poem } from '../../types/poem';
import { loadFavorites, saveFavorites } from '../../utils/storage';
import { favoritesApi } from '../../services/api';

interface FavoritesState {
  items: Poem[];
  loading: boolean;
  error: string | null;
  lastSynced: number | null;
}

const initialState: FavoritesState = {
  items: loadFavorites(),
  loading: false,
  error: null,
  lastSynced: null,
};

// 从服务器获取收藏数据
export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async () => {
    const serverFavorites = await favoritesApi.getFavorites();
    const localFavorites = loadFavorites();
    
    // 合并本地和服务器数据，以本地数据为准
    const mergedFavorites = [...localFavorites];
    serverFavorites.forEach(serverPoem => {
      if (!localFavorites.some(localPoem => localPoem.id === serverPoem.id)) {
        mergedFavorites.push(serverPoem);
      }
    });
    
    saveFavorites(mergedFavorites);
    return mergedFavorites;
  }
);

// 同步收藏数据到服务器
export const syncFavorites = createAsyncThunk(
  'favorites/syncFavorites',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const favorites = state.favorites.items;
    const syncedFavorites = await favoritesApi.syncFavorites(favorites);
    saveFavorites(syncedFavorites);
    return syncedFavorites;
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.lastSynced = Date.now();
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch favorites';
      })
      .addCase(syncFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(syncFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.lastSynced = Date.now();
      })
      .addCase(syncFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to sync favorites';
      });
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export const selectFavorites = (state: RootState) => state.favorites.items;
export const selectIsFavorite = (state: RootState, poemId: number) =>
  state.favorites.items.some(poem => poem.id === poemId);
export const selectFavoritesLoading = (state: RootState) => state.favorites.loading;
export const selectFavoritesError = (state: RootState) => state.favorites.error;
export const selectLastSynced = (state: RootState) => state.favorites.lastSynced;

export default favoritesSlice.reducer; 