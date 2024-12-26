import type { Poem } from '../types/poem';

const FAVORITES_KEY = 'ancient_poem_favorites';

export const loadFavorites = (): Poem[] => {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load favorites:', error);
    return [];
  }
};

export const saveFavorites = (favorites: Poem[]): void => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Failed to save favorites:', error);
  }
}; 