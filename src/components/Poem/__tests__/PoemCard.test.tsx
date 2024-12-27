import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import poemReducer from '@/store/slices/poemSlice';
import favoritesReducer from '@/store/slices/favoritesSlice';
import { PoemCard } from '../PoemCard';

const mockPoem = {
  id: 1,
  title: '静夜思',
  author: '李白',
  dynasty: '唐',
  content: ['床前明月光，', '疑是地上霜。', '举头望明月，', '低头思故乡。'],
  tags: ['抒情', '思乡', '月亮'],
  translation: ['Test translation'],
  appreciation: 'Test appreciation',
  notes: ['Test note'],
  background: 'Test background'
};

const renderWithProviders = (component: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      poems: poemReducer,
      favorites: favoritesReducer,
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        {component}
      </MemoryRouter>
    </Provider>
  );
};

describe('PoemCard', () => {
  beforeAll(() => {
    // 禁用 React Router 的警告
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders poem information correctly', () => {
    renderWithProviders(<PoemCard poem={mockPoem} />);
    
    expect(screen.getByText('静夜思')).toBeInTheDocument();
    expect(screen.getByText(/李白/)).toBeInTheDocument();
    expect(screen.getByText(/唐/)).toBeInTheDocument();
    expect(screen.getByText('床前明月光，')).toBeInTheDocument();
  });

  it('displays all poem content lines', () => {
    renderWithProviders(<PoemCard poem={mockPoem} />);
    
    mockPoem.content.forEach(line => {
      expect(screen.getByText(line)).toBeInTheDocument();
    });
  });

  it('displays all tags', () => {
    renderWithProviders(<PoemCard poem={mockPoem} />);
    
    mockPoem.tags.forEach(tag => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('navigates to poem detail page when clicked', () => {
    renderWithProviders(<PoemCard poem={mockPoem} />);
    
    const card = screen.getByTestId('poem-card');
    expect(card).toHaveAttribute('href', `/poems/${mockPoem.id}`);
  });

  it('toggles favorite status when favorite button is clicked', () => {
    renderWithProviders(<PoemCard poem={mockPoem} />);
    
    const favoriteButton = screen.getByLabelText('添加收藏');
    fireEvent.click(favoriteButton);
    
    // Check if the button state changed
    expect(favoriteButton).toHaveClass('active');
  });
}); 