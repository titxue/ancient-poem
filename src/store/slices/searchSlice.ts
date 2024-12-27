import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  searchHistory: string[];
  suggestions: string[];
  advancedSearch: {
    dynasty?: string;
    author?: string;
    theme?: string;
    type?: string;
    tag?: string[];
    category?: string;
  };
  keyword: string;
}

const initialState: SearchState = {
  searchHistory: [],
  suggestions: [],
  advancedSearch: {
    tag: [],
  },
  keyword: '',
};

const MAX_HISTORY_ITEMS = 10;

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },
    addToHistory: (state, action: PayloadAction<string>) => {
      const newHistory = state.searchHistory.filter(
        (item) => item !== action.payload
      );
      newHistory.unshift(action.payload);
      state.searchHistory = newHistory.slice(0, MAX_HISTORY_ITEMS);
    },
    clearHistory: (state) => {
      state.searchHistory = [];
    },
    setSuggestions: (state, action: PayloadAction<string[]>) => {
      state.suggestions = action.payload;
    },
    setAdvancedSearch: (
      state,
      action: PayloadAction<SearchState['advancedSearch']>
    ) => {
      state.advancedSearch = {
        ...state.advancedSearch,
        ...action.payload,
      };
    },
    clearAdvancedSearch: (state) => {
      state.advancedSearch = {
        tag: [],
      };
    },
  },
});

export const {
  setKeyword,
  addToHistory,
  clearHistory,
  setSuggestions,
  setAdvancedSearch,
  clearAdvancedSearch,
} = searchSlice.actions;

export default searchSlice.reducer; 