import {
    capitalizeFirst,
    extractPokemonId,
    formatPokemonId,
    getPokemonImageUrl,
    getPokemonNameFromUrl
} from '../src/utils/pokemon';

describe('Pokemon Utils Extended', () => {
  describe('getPokemonImageUrl', () => {
    it('should generate correct image URL for valid ID', () => {
      expect(getPokemonImageUrl(1)).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png');
      expect(getPokemonImageUrl(25)).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png');
      expect(getPokemonImageUrl(150)).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png');
    });

    it('should handle zero and negative IDs', () => {
      expect(getPokemonImageUrl(0)).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/0.png');
      expect(getPokemonImageUrl(-1)).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/-1.png');
    });

    it('should handle large IDs', () => {
      expect(getPokemonImageUrl(1000)).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1000.png');
    });
  });

  describe('extractPokemonId edge cases', () => {
    it('should handle URLs with multiple slashes', () => {
      expect(extractPokemonId('https://pokeapi.co/api/v2/pokemon/1/')).toBe('1');
      expect(extractPokemonId('https://pokeapi.co/api/v2/pokemon/25/')).toBe('25');
    });

    it('should handle URLs without trailing slash', () => {
      expect(extractPokemonId('https://pokeapi.co/api/v2/pokemon/1')).toBe('1');
      expect(extractPokemonId('https://pokeapi.co/api/v2/pokemon/25')).toBe('25');
    });

    it('should handle malformed URLs', () => {
      expect(extractPokemonId('invalid-url')).toBe('invalid-url');
      expect(extractPokemonId('')).toBe('');
      expect(extractPokemonId('https://pokeapi.co/api/v2/pokemon/')).toBe('pokemon');
    });

    it('should handle URLs with query parameters', () => {
      expect(extractPokemonId('https://pokeapi.co/api/v2/pokemon/1/?param=value')).toBe('?param=value');
    });
  });

  describe('getPokemonNameFromUrl edge cases', () => {
    it('should handle URLs with trailing slash', () => {
      expect(getPokemonNameFromUrl('https://pokeapi.co/api/v2/pokemon/bulbasaur/')).toBe('bulbasaur');
      expect(getPokemonNameFromUrl('https://pokeapi.co/api/v2/pokemon/pikachu/')).toBe('pikachu');
    });

    it('should handle URLs without trailing slash', () => {
      expect(getPokemonNameFromUrl('https://pokeapi.co/api/v2/pokemon/bulbasaur')).toBe('bulbasaur');
      expect(getPokemonNameFromUrl('https://pokeapi.co/api/v2/pokemon/pikachu')).toBe('pikachu');
    });

    it('should handle malformed URLs', () => {
      expect(getPokemonNameFromUrl('invalid-url')).toBe('invalid-url');
      expect(getPokemonNameFromUrl('')).toBe('');
      expect(getPokemonNameFromUrl('https://pokeapi.co/api/v2/pokemon/')).toBe('pokemon');
    });
  });

  describe('formatPokemonId edge cases', () => {
    it('should format single digit IDs', () => {
      expect(formatPokemonId(1)).toBe('#001');
      expect(formatPokemonId(9)).toBe('#009');
    });

    it('should format double digit IDs', () => {
      expect(formatPokemonId(10)).toBe('#010');
      expect(formatPokemonId(99)).toBe('#099');
    });

    it('should format triple digit IDs', () => {
      expect(formatPokemonId(100)).toBe('#100');
      expect(formatPokemonId(999)).toBe('#999');
    });

    it('should format four digit IDs', () => {
      expect(formatPokemonId(1000)).toBe('#1000');
      expect(formatPokemonId(9999)).toBe('#9999');
    });

    it('should handle zero', () => {
      expect(formatPokemonId(0)).toBe('#000');
    });
  });

  describe('capitalizeFirst edge cases', () => {
    it('should handle empty string', () => {
      expect(capitalizeFirst('')).toBe('');
    });

    it('should handle single character', () => {
      expect(capitalizeFirst('a')).toBe('A');
      expect(capitalizeFirst('z')).toBe('Z');
    });

    it('should handle already capitalized strings', () => {
      expect(capitalizeFirst('Pokemon')).toBe('Pokemon');
      expect(capitalizeFirst('POKEMON')).toBe('POKEMON');
    });

    it('should handle strings with numbers', () => {
      expect(capitalizeFirst('pokemon123')).toBe('Pokemon123');
    });

    it('should handle strings with special characters', () => {
      expect(capitalizeFirst('pokemon-go')).toBe('Pokemon-go');
      expect(capitalizeFirst('pokemon!')).toBe('Pokemon!');
    });
  });
});
