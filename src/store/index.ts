import { configureStore } from '@reduxjs/toolkit';
import poemReducer from './slices/poemSlice.ts';
import favoritesReducer from './slices/favoritesSlice.ts';
import themeReducer from './slices/themeSlice.ts';

export const store = configureStore({
  reducer: {
    poems: poemReducer,
    favorites: favoritesReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 