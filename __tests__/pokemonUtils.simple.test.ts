import { capitalizeFirst, extractPokemonId, formatPokemonId, getPokemonNameFromUrl } from '../src/utils/pokemon';

describe('Pokemon Utils', () => {
  describe('extractPokemonId', () => {
    it('should extract ID from URL with trailing slash', () => {
      const url = 'https://pokeapi.co/api/v2/pokemon/1/';
      expect(extractPokemonId(url)).toBe('1');
    });

    it('should extract ID from URL without trailing slash', () => {
      const url = 'https://pokeapi.co/api/v2/pokemon/25';
      expect(extractPokemonId(url)).toBe('25');
    });

    it('should handle malformed URLs', () => {
      const url = 'invalid-url';
      expect(extractPokemonId(url)).toBe('invalid-url');
    });
  });

  describe('getPokemonNameFromUrl', () => {
    it('should extract name from URL', () => {
      const url = 'https://pokeapi.co/api/v2/pokemon/bulbasaur/';
      expect(getPokemonNameFromUrl(url)).toBe('bulbasaur');
    });

    it('should handle URLs without trailing slash', () => {
      const url = 'https://pokeapi.co/api/v2/pokemon/pikachu';
      expect(getPokemonNameFromUrl(url)).toBe('pikachu');
    });
  });

  describe('formatPokemonId', () => {
    it('should format single digit ID', () => {
      expect(formatPokemonId(1)).toBe('#001');
    });

    it('should format double digit ID', () => {
      expect(formatPokemonId(25)).toBe('#025');
    });

    it('should format triple digit ID', () => {
      expect(formatPokemonId(150)).toBe('#150');
    });
  });

  describe('capitalizeFirst', () => {
    it('should capitalize first letter', () => {
      expect(capitalizeFirst('bulbasaur')).toBe('Bulbasaur');
    });

    it('should handle empty string', () => {
      expect(capitalizeFirst('')).toBe('');
    });

    it('should handle single character', () => {
      expect(capitalizeFirst('a')).toBe('A');
    });
  });
});
