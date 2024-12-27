import poemReducer, {
  setCurrentPage,
  setPageSize,
  setCurrentCategory,
  clearSelectedPoem,
} from '../poemSlice';
import type { Poem } from '@/types/poem';

describe('poem reducer', () => {
  const initialState = {
    poems: [],
    selectedPoem: null,
    loading: false,
    error: null,
    currentPage: 1,
    pageSize: 10,
    total: 0,
    currentCategory: 'all',
  };

  const mockPoem: Poem = {
    id: 1,
    title: 'Test Poem',
    author: 'Test Author',
    dynasty: '唐',
    content: ['Test content'],
    tags: ['test'],
    translation: ['Test translation'],
    appreciation: 'Test appreciation',
    notes: ['Test note'],
    background: 'Test background'
  };

  it('should handle initial state', () => {
    expect(poemReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setCurrentPage', () => {
    const actual = poemReducer(initialState, setCurrentPage(2));
    expect(actual.currentPage).toEqual(2);
  });

  it('should handle setPageSize', () => {
    const actual = poemReducer(initialState, setPageSize(24));
    expect(actual.pageSize).toEqual(24);
  });

  it('should handle setCurrentCategory', () => {
    const actual = poemReducer(initialState, setCurrentCategory('tang'));
    expect(actual.currentCategory).toEqual('tang');
  });

  it('should handle clearSelectedPoem', () => {
    const stateWithSelectedPoem = {
      ...initialState,
      selectedPoem: mockPoem,
    };
    const actual = poemReducer(stateWithSelectedPoem, clearSelectedPoem());
    expect(actual.selectedPoem).toBeNull();
  });
}); 