import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface ThemeState {
  isDarkMode: boolean;
  followSystem: boolean;
}

const initialState: ThemeState = {
  isDarkMode: localStorage.getItem('theme') === 'dark',
  followSystem: localStorage.getItem('followSystem') === 'true',
};

// 初始化时应用主题
if (initialState.isDarkMode) {
  document.body.classList.add('dark-theme');
}

const startThemeTransition = () => {
  document.documentElement.classList.add('theme-transitioning');
  document.body.classList.add('theme-transition-active');
  
  setTimeout(() => {
    document.documentElement.classList.remove('theme-transitioning');
    document.body.classList.remove('theme-transition-active');
  }, 200); // 与 CSS 中的过渡时间相匹配
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      startThemeTransition();
      state.isDarkMode = !state.isDarkMode;
      state.followSystem = false;
      if (state.isDarkMode) {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
      }
      localStorage.setItem('followSystem', 'false');
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      startThemeTransition();
      state.isDarkMode = action.payload;
      if (state.isDarkMode) {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
      }
    },
    toggleFollowSystem: (state) => {
      state.followSystem = !state.followSystem;
      localStorage.setItem('followSystem', state.followSystem.toString());
      
      if (state.followSystem) {
        // 如果开启系统跟随，立即应用系统主题
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (isDarkMode !== state.isDarkMode) {
          startThemeTransition();
          state.isDarkMode = isDarkMode;
          if (isDarkMode) {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
          } else {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
          }
        }
      }
    },
  },
});

export const { toggleTheme, setTheme, toggleFollowSystem } = themeSlice.actions;

export const selectIsDarkMode = (state: RootState) => state.theme.isDarkMode;
export const selectFollowSystem = (state: RootState) => state.theme.followSystem;

export default themeSlice.reducer; 