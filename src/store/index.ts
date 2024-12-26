import { configureStore } from '@reduxjs/toolkit';
import poemReducer from './slices/poemSlice';

export const store = configureStore({
  reducer: {
    poems: poemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 