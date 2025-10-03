import { render } from '@testing-library/react-native';
import React from 'react';
import { LoadingSpinner } from '../src/components/ui/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('should render with default props', () => {
    const { getByText, getByTestId } = render(<LoadingSpinner />);
    
    expect(getByText('Loading...')).toBeTruthy();
    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  it('should render with custom message', () => {
    const { getByText } = render(<LoadingSpinner message="Loading Pokemon..." />);
    
    expect(getByText('Loading Pokemon...')).toBeTruthy();
  });

  it('should render with small size', () => {
    const { getByTestId } = render(<LoadingSpinner size="small" />);
    
    const indicator = getByTestId('activity-indicator');
    expect(indicator.props.size).toBe('small');
  });

  it('should render with large size', () => {
    const { getByTestId } = render(<LoadingSpinner size="large" />);
    
    const indicator = getByTestId('activity-indicator');
    expect(indicator.props.size).toBe('large');
  });

  it('should render with custom message and size', () => {
    const { getByText, getByTestId } = render(
      <LoadingSpinner message="Loading more Pokemon..." size="small" />
    );
    
    expect(getByText('Loading more Pokemon...')).toBeTruthy();
    
    const indicator = getByTestId('activity-indicator');
    expect(indicator.props.size).toBe('small');
  });

  it('should have correct color for activity indicator', () => {
    const { getByTestId } = render(<LoadingSpinner />);
    
    const indicator = getByTestId('activity-indicator');
    expect(indicator.props.color).toBe('#007AFF');
  });

  it('should render empty message when message is empty string', () => {
    const { getByText } = render(<LoadingSpinner message="" />);
    
    expect(getByText('')).toBeTruthy();
  });
});
