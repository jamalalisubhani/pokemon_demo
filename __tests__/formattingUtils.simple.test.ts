import { formatHeight, formatWeight } from '../src/utils/formatting';

describe('Formatting Utils', () => {
  describe('formatHeight', () => {
    it('should format height in decimeters to centimeters', () => {
      expect(formatHeight(7)).toBe('70 cm');
      expect(formatHeight(10)).toBe('100 cm');
      expect(formatHeight(0)).toBe('0 cm');
    });

    it('should handle decimal heights', () => {
      expect(formatHeight(7.5)).toBe('75 cm');
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
    });
  });
});
