import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Poem, PoemListResponse, PoemQueryParams } from '../../types/poem';
import * as api from '../../services/api';

interface PoemState {
  poems: Poem[];
  total: number;
  currentPage: number;
  pageSize: number;
  loading: boolean;
  error: string | null;
  selectedPoem: Poem | null;
}

const initialState: PoemState = {
  poems: [],
  total: 0,
  currentPage: 1,
  pageSize: 10,
  loading: false,
  error: null,
  selectedPoem: null,
};

// Async thunks
export const fetchPoems = createAsyncThunk(
  'poems/fetchPoems',
  async (params: PoemQueryParams) => {
    const response = await api.getPoems(params);
    return response;
  }
);

export const fetchPoemById = createAsyncThunk(
  'poems/fetchPoemById',
  async (id: number) => {
    const response = await api.getPoemById(id);
    return response;
  }
);

export const searchPoems = createAsyncThunk(
  'poems/searchPoems',
  async (params: PoemQueryParams) => {
    const response = await api.searchPoems(params);
    return response;
  }
);

const poemSlice = createSlice({
  name: 'poems',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    clearSelectedPoem: (state) => {
      state.selectedPoem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchPoems
      .addCase(fetchPoems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPoems.fulfilled, (state, action) => {
        state.loading = false;
        state.poems = action.payload.poems;
        state.total = action.payload.total;
      })
      .addCase(fetchPoems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '获取诗词列表失败';
      })
      // fetchPoemById
      .addCase(fetchPoemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPoemById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPoem = action.payload;
      })
      .addCase(fetchPoemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '获取诗词详情失败';
      })
      // searchPoems
      .addCase(searchPoems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPoems.fulfilled, (state, action) => {
        state.loading = false;
        state.poems = action.payload.poems;
        state.total = action.payload.total;
      })
      .addCase(searchPoems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '搜索诗词失败';
      });
  },
});

export const { setCurrentPage, setPageSize, clearSelectedPoem } = poemSlice.actions;
export default poemSlice.reducer; 