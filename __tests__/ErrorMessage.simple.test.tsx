import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { ErrorMessage } from '../src/components/ui/ErrorMessage';

describe('ErrorMessage', () => {
  const mockOnRetry = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render error message', () => {
    const { getByText } = render(
      <ErrorMessage message="Network error" />
    );
    
    expect(getByText('Network error')).toBeTruthy();
  });

  it('should render retry button when onRetry is provided', () => {
    const { getByText } = render(
      <ErrorMessage message="Network error" onRetry={mockOnRetry} />
    );
    
    expect(getByText('Retry')).toBeTruthy();
  });

  it('should not render retry button when onRetry is not provided', () => {
    const { queryByText } = render(
      <ErrorMessage message="Network error" />
    );
    
    expect(queryByText('Retry')).toBeNull();
  });

  it('should call onRetry when retry button is pressed', () => {
    const { getByText } = render(
      <ErrorMessage message="Network error" onRetry={mockOnRetry} />
    );
    
    const retryButton = getByText('Retry');
    fireEvent.press(retryButton);
    
    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  it('should render different error messages', () => {
    const { getByText, rerender } = render(
      <ErrorMessage message="Network error" />
    );
    
    expect(getByText('Network error')).toBeTruthy();
    
    rerender(<ErrorMessage message="Server error" />);
    expect(getByText('Server error')).toBeTruthy();
  });

  it('should handle long error messages', () => {
    const longMessage = 'This is a very long error message that should be displayed correctly and not cause any layout issues';
    
    const { getByText } = render(
      <ErrorMessage message={longMessage} />
    );
    
    expect(getByText(longMessage)).toBeTruthy();
  });

  it('should handle empty error message', () => {
    const { getByText } = render(
      <ErrorMessage message="" />
    );
    
    expect(getByText('')).toBeTruthy();
  });

  it('should handle special characters in error message', () => {
    const specialMessage = 'Error: Failed to load data (HTTP 500) - "Internal Server Error"';
    
    const { getByText } = render(
      <ErrorMessage message={specialMessage} />
    );
    
    expect(getByText(specialMessage)).toBeTruthy();
  });

  it('should have correct styling for error message', () => {
    const { getByText } = render(
      <ErrorMessage message="Test error" />
    );
    
    const errorText = getByText('Test error');
    expect(errorText.props.style).toMatchObject({
      fontSize: 16,
      color: '#FF3B30',
      textAlign: 'center',
    });
  });

  it('should have correct styling for retry button', () => {
    const { getByText } = render(
      <ErrorMessage message="Test error" onRetry={mockOnRetry} />
    );
    
    const retryButton = getByText('Retry');
    expect(retryButton.props.style).toMatchObject({
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    });
  });
});
