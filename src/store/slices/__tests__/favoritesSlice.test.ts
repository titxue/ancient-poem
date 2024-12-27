import favoritesReducer, {
  addFavorite,
  removeFavorite,
  syncFavorites,
} from '../favoritesSlice';
import type { Poem } from '@/types/poem';

describe('favorites reducer', () => {
  const mockPoem: Poem = {
    id: 1,
    title: '静夜思',
    author: '李白',
    dynasty: '唐',
    content: ['床前明月光，'],
    tags: ['抒情'],
    translation: ['Test translation'],
    appreciation: 'Test appreciation',
    notes: ['Test note'],
    background: 'Test background'
  };

  const initialState = {
    items: [],
    syncData: {},
    loading: false,
    error: null,
    lastSynced: null,
  };

  it('should handle initial state', () => {
    expect(favoritesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addFavorite', () => {
    const actual = favoritesReducer(initialState, addFavorite(mockPoem));
    expect(actual.items).toHaveLength(1);
    expect(actual.items[0]).toEqual(mockPoem);
    expect(actual.syncData[mockPoem.id]).toBeDefined();
  });

  it('should not add duplicate favorites', () => {
    const stateWithFavorite = favoritesReducer(initialState, addFavorite(mockPoem));
    const actual = favoritesReducer(stateWithFavorite, addFavorite(mockPoem));
    expect(actual.items).toHaveLength(1);
  });

  it('should handle removeFavorite', () => {
    const stateWithFavorite = favoritesReducer(initialState, addFavorite(mockPoem));
    const actual = favoritesReducer(stateWithFavorite, removeFavorite(mockPoem.id));
    expect(actual.items).toHaveLength(0);
    expect(actual.syncData[mockPoem.id]).toBeUndefined();
  });

  it('should handle syncFavorites.pending', () => {
    const actual = favoritesReducer(initialState, {
      type: syncFavorites.pending.type,
      payload: undefined,
    });
    expect(actual.loading).toBe(true);
    expect(actual.error).toBeNull();
  });

  it('should handle syncFavorites.fulfilled', () => {
    const mockResponse = {
      poems: [mockPoem],
      syncData: { [mockPoem.id]: Date.now() },
      serverTime: Date.now(),
    };
    const actual = favoritesReducer(initialState, {
      type: syncFavorites.fulfilled.type,
      payload: mockResponse,
    });
    expect(actual.loading).toBe(false);
    expect(actual.items).toEqual(mockResponse.poems);
    expect(actual.syncData).toEqual(mockResponse.syncData);
    expect(actual.lastSynced).toBe(mockResponse.serverTime);
  });

  it('should handle syncFavorites.rejected', () => {
    const error = new Error('Failed to sync');
    const actual = favoritesReducer(initialState, {
      type: syncFavorites.rejected.type,
      error: { message: error.message },
    });
    expect(actual.loading).toBe(false);
    expect(actual.error).toBe(error.message);
  });
}); 