import { configureStore } from '@reduxjs/toolkit';
import poemReducer from './slices/poemSlice';
import favoritesReducer from './slices/favoritesSlice';
import themeReducer from './slices/themeSlice';
import searchReducer from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    poems: poemReducer,
    favorites: favoritesReducer,
    theme: themeReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 