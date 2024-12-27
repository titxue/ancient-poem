/** @jsx React.createElement */
import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '../index';

// Create a component that throws an error
const ThrowError: React.FC<{ shouldThrow: boolean }> = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>Normal component</div>;
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // Prevent console.error from cluttering the test output
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders error UI when child throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('页面出错了')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('provides retry functionality', () => {
    const onResetMock = jest.fn();
    const TestComponent = () => {
      const [hasError, setHasError] = useState(true);
      return (
        <ErrorBoundary onReset={() => {
          onResetMock();
          setHasError(false);
        }}>
          {hasError ? (
            <ThrowError shouldThrow={true} />
          ) : (
            <div>Normal component</div>
          )}
        </ErrorBoundary>
      );
    };

    render(<TestComponent />);
    expect(screen.getByText('页面出错了')).toBeInTheDocument();

    // Click retry button
    fireEvent.click(screen.getByText('重 试'));
    expect(screen.getByText('Normal component')).toBeInTheDocument();
    expect(onResetMock).toHaveBeenCalledTimes(1);
  });

  it('provides home navigation button', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const homeButton = screen.getByText('返回首页');
    expect(homeButton).toBeInTheDocument();
    expect(homeButton.closest('a')).toHaveAttribute('href', '/');
  });

  it('logs error information', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(consoleSpy).toHaveBeenCalled();
    const errorCall = consoleSpy.mock.calls.find(call => 
      call[0] === 'Error caught by boundary:' ||
      (call[0] instanceof Error && call[0].message === 'Test error')
    );
    expect(errorCall).toBeDefined();
  });
}); 