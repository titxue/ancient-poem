import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders poem title and author', () => {
    render(<App />);
    
    expect(screen.getByText('静夜思')).toBeInTheDocument();
    expect(screen.getByText('李白')).toBeInTheDocument();
  });

  test('renders poem content', () => {
    render(<App />);
    
    expect(screen.getByText('床前明月光，')).toBeInTheDocument();
    expect(screen.getByText('疑是地上霜。')).toBeInTheDocument();
    expect(screen.getByText('举头望明月，')).toBeInTheDocument();
    expect(screen.getByText('低头思故乡。')).toBeInTheDocument();
  });
}); 