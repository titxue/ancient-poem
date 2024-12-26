import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import type { Poem } from '../../types/poem';
import type { FavoriteSync } from '../../types/favorites';
import { loadFavorites, saveFavorites } from '../../utils/storage';
import { favoritesApi } from '../../services/api';

interface FavoritesState {
  items: Poem[];
  syncData: { [id: number]: number }; // id -> updatedAt 映射
  loading: boolean;
  error: string | null;
  lastSynced: number | null;
}

const initialState: FavoritesState = {
  items: loadFavorites(),
  syncData: {},
  loading: false,
  error: null,
  lastSynced: null,
};

// 从服务器获取收藏数据
export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { lastSynced } = state.favorites;
    const response = await favoritesApi.getFavorites(lastSynced || undefined);
    
    // 获取完整的诗词数据
    const poemPromises = response.favorites.map(async fav => {
      const poem = await favoritesApi.fetchPoemById(fav.id);
      return { poem, updatedAt: fav.updatedAt };
    });
    
    const poemResults = await Promise.all(poemPromises);
    const poems = poemResults
      .filter(result => result.poem) // 过滤掉未找到的诗词
      .map(result => result.poem as Poem);
    
    // 更新同步数据
    const syncData: { [id: number]: number } = {};
    response.favorites.forEach(fav => {
      syncData[fav.id] = fav.updatedAt;
    });
    
    return {
      poems,
      syncData,
      serverTime: response.serverTime,
    };
  }
);

// 同步收藏数据到服务器
export const syncFavorites = createAsyncThunk(
  'favorites/syncFavorites',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { items, syncData, lastSynced } = state.favorites;
    
    // 构建同步数据
    const favorites: FavoriteSync[] = items.map(poem => ({
      id: poem.id,
      updatedAt: syncData[poem.id] || Date.now(),
    }));
    
    const response = await favoritesApi.syncFavorites(favorites, lastSynced || undefined);
    
    // 获取完整的诗词数据
    const poemPromises = response.favorites.map(async fav => {
      const poem = await favoritesApi.fetchPoemById(fav.id);
      return { poem, updatedAt: fav.updatedAt };
    });
    
    const poemResults = await Promise.all(poemPromises);
    const poems = poemResults
      .filter(result => result.poem)
      .map(result => result.poem as Poem);
    
    // 更新同步数据
    const newSyncData: { [id: number]: number } = {};
    response.favorites.forEach(fav => {
      newSyncData[fav.id] = fav.updatedAt;
    });
    
    return {
      poems,
      syncData: newSyncData,
      serverTime: response.serverTime,
    };
  }
);

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Poem>) => {
      if (!state.items.some(item => item.id === action.payload.id)) {
        state.items.push(action.payload);
        state.syncData[action.payload.id] = Date.now();
        saveFavorites(state.items);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(poem => poem.id !== action.payload);
      delete state.syncData[action.payload];
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
        state.items = action.payload.poems;
        state.syncData = action.payload.syncData;
        state.lastSynced = action.payload.serverTime;
        saveFavorites(state.items);
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
        state.items = action.payload.poems;
        state.syncData = action.payload.syncData;
        state.lastSynced = action.payload.serverTime;
        saveFavorites(state.items);
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