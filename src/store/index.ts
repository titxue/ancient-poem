import { configureStore } from '@reduxjs/toolkit';
import poemReducer from './slices/poemSlice.ts';
import favoritesReducer from './slices/favoritesSlice.ts';

export const store = configureStore({
  reducer: {
    poems: poemReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 