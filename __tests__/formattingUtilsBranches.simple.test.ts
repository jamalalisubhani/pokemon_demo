import { formatDate, formatHeight, formatNumber, formatPercentage, formatWeight, truncateText } from '../src/utils/formatting';

describe('Formatting Utils Branches', () => {
  describe('formatHeight branch coverage', () => {
    it('should handle normal heights', () => {
      expect(formatHeight(7)).toBe('70 cm');
      expect(formatHeight(10)).toBe('100 cm');
    });

    it('should handle zero height', () => {
      expect(formatHeight(0)).toBe('0 cm');
    });

    it('should handle large heights', () => {
      expect(formatHeight(100)).toBe('1000 cm');
    });
  });

  describe('formatWeight branch coverage', () => {
    it('should handle normal weights', () => {
      expect(formatWeight(69)).toBe('6.9 kg');
      expect(formatWeight(100)).toBe('10 kg');
    });

    it('should handle zero weight', () => {
      expect(formatWeight(0)).toBe('0 kg');
    });

    it('should handle large weights', () => {
      expect(formatWeight(1000)).toBe('100 kg');
    });
  });

  describe('formatNumber branch coverage', () => {
    it('should handle default decimals', () => {
      expect(formatNumber(123.456)).toBe('123');
    });

    it('should handle custom decimals', () => {
      expect(formatNumber(123.456, 2)).toBe('123.46');
      expect(formatNumber(123.456, 1)).toBe('123.5');
    });

    it('should handle zero', () => {
      expect(formatNumber(0)).toBe('0');
      expect(formatNumber(0, 2)).toBe('0.00');
    });
  });

  describe('formatPercentage branch coverage', () => {
    it('should handle normal percentages', () => {
      expect(formatPercentage(50, 100)).toBe('50.0%');
      expect(formatPercentage(25, 100)).toBe('25.0%');
    });

    it('should handle zero total', () => {
      expect(formatPercentage(50, 0)).toBe('0%');
    });

    it('should handle zero value', () => {
      expect(formatPercentage(0, 100)).toBe('0.0%');
    });
  });

  describe('truncateText branch coverage', () => {
    it('should handle short text', () => {
      expect(truncateText('short', 10)).toBe('short');
    });

    it('should handle long text', () => {
      expect(truncateText('this is a very long text', 10)).toBe('this is a ...');
    });

    it('should handle exact length', () => {
      expect(truncateText('exact', 5)).toBe('exact');
    });
  });

  describe('formatDate branch coverage', () => {
    it('should format dates correctly', () => {
      const date = new Date('2023-01-15');
      expect(formatDate(date)).toBe('Jan 15, 2023');
    });

    it('should handle different dates', () => {
      const date = new Date('2023-12-25');
      expect(formatDate(date)).toBe('Dec 25, 2023');
    });
  });
});
