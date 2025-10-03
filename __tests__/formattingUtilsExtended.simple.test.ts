import {
    formatDate,
    formatHeight,
    formatNumber,
    formatPercentage,
    formatWeight,
    truncateText
} from '../src/utils/formatting';

describe('Formatting Utils Extended', () => {
  describe('formatNumber', () => {
    it('should format numbers with default decimals', () => {
      expect(formatNumber(123.456)).toBe('123');
      expect(formatNumber(0)).toBe('0');
      expect(formatNumber(999.999)).toBe('1000');
    });

    it('should format numbers with custom decimals', () => {
      expect(formatNumber(123.456, 2)).toBe('123.46');
      expect(formatNumber(123.456, 1)).toBe('123.5');
      expect(formatNumber(123.456, 3)).toBe('123.456');
    });

    it('should handle edge cases', () => {
      expect(formatNumber(0, 2)).toBe('0.00');
      expect(formatNumber(-123.456, 2)).toBe('-123.46');
    });
  });

  describe('formatPercentage', () => {
    it('should format percentages correctly', () => {
      expect(formatPercentage(25, 100)).toBe('25.0%');
      expect(formatPercentage(50, 200)).toBe('25.0%');
      expect(formatPercentage(1, 3)).toBe('33.3%');
    });

    it('should handle zero total', () => {
      expect(formatPercentage(25, 0)).toBe('0%');
      expect(formatPercentage(0, 0)).toBe('0%');
    });

    it('should handle edge cases', () => {
      expect(formatPercentage(0, 100)).toBe('0.0%');
      expect(formatPercentage(100, 100)).toBe('100.0%');
    });
  });

  describe('truncateText', () => {
    it('should truncate long text', () => {
      expect(truncateText('This is a long text', 10)).toBe('This is a ...');
      expect(truncateText('Very long text that should be truncated', 20)).toBe('Very long text that ...');
    });

    it('should not truncate short text', () => {
      expect(truncateText('Short', 10)).toBe('Short');
      expect(truncateText('Exactly ten', 10)).toBe('Exactly te...');
    });

    it('should handle edge cases', () => {
      expect(truncateText('', 10)).toBe('');
      expect(truncateText('Text', 0)).toBe('...');
    });
  });

  describe('formatDate', () => {
    it('should format dates correctly', () => {
      const date = new Date('2023-12-25');
      const formatted = formatDate(date);
      expect(formatted).toMatch(/Dec 25, 2023/);
    });

    it('should handle different dates', () => {
      const date1 = new Date('2023-01-01');
      const date2 = new Date('2023-06-15');
      
      expect(formatDate(date1)).toMatch(/Jan 1, 2023/);
      expect(formatDate(date2)).toMatch(/Jun 15, 2023/);
    });
  });

  describe('formatHeight', () => {
    it('should format height in decimeters to centimeters', () => {
      expect(formatHeight(7)).toBe('70 cm');
      expect(formatHeight(10)).toBe('100 cm');
      expect(formatHeight(0)).toBe('0 cm');
    });

    it('should handle decimal heights', () => {
      expect(formatHeight(7.5)).toBe('75 cm');
      expect(formatHeight(10.2)).toBe('102 cm');
    });

    it('should handle edge cases', () => {
      expect(formatHeight(-1)).toBe('-10 cm');
      expect(formatHeight(100)).toBe('1000 cm');
    });
  });

  describe('formatWeight', () => {
    it('should format weight in hectograms to kilograms', () => {
      expect(formatWeight(69)).toBe('6.9 kg');
      expect(formatWeight(130)).toBe('13 kg');
      expect(formatWeight(0)).toBe('0 kg');
    });

    it('should handle decimal weights', () => {
      expect(formatWeight(69.5)).toBe('6.95 kg');
      expect(formatWeight(100.2)).toBe('10.02 kg');
    });

    it('should handle edge cases', () => {
      expect(formatWeight(-1)).toBe('-0.1 kg');
      expect(formatWeight(1000)).toBe('100 kg');
    });
  });
});
