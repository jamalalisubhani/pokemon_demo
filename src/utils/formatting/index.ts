// General formatting utility functions
export const formatNumber = (num: number, decimals: number = 0): string => {
  return num.toFixed(decimals);
};

export const formatPercentage = (value: number, total: number): string => {
  if (total === 0) return '0%';
  return `${((value / total) * 100).toFixed(1)}%`;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Pokemon-specific formatting functions
export const formatHeight = (height: number): string => `${height * 10} cm`;
export const formatWeight = (weight: number): string => `${weight / 10} kg`;
