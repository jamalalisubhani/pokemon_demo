import {
    capitalizeFirst,
    extractPokemonId,
    formatPokemonId,
    getPokemonImageUrl,
    getPokemonNameFromUrl
} from '../src/utils/pokemon';

describe('Pokemon Utils Comprehensive', () => {
  describe('extractPokemonId', () => {
    it('should extract ID from various URL formats', () => {
      expect(extractPokemonId('https://pokeapi.co/api/v2/pokemon/1/')).toBe('1');
      expect(extractPokemonId('https://pokeapi.co/api/v2/pokemon/25/')).toBe('25');
      expect(extractPokemonId('https://pokeapi.co/api/v2/pokemon/150/')).toBe('150');
      expect(extractPokemonId('https://pokeapi.co/api/v2/pokemon/1000/')).toBe('1000');
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

  describe('getPokemonNameFromUrl', () => {
    it('should extract name from various URL formats', () => {
      expect(getPokemonNameFromUrl('https://pokeapi.co/api/v2/pokemon/bulbasaur/')).toBe('bulbasaur');
      expect(getPokemonNameFromUrl('https://pokeapi.co/api/v2/pokemon/charmander/')).toBe('charmander');
      expect(getPokemonNameFromUrl('https://pokeapi.co/api/v2/pokemon/pikachu/')).toBe('pikachu');
    });

    it('should handle URLs without trailing slash', () => {
      expect(getPokemonNameFromUrl('https://pokeapi.co/api/v2/pokemon/bulbasaur')).toBe('bulbasaur');
      expect(getPokemonNameFromUrl('https://pokeapi.co/api/v2/pokemon/charmander')).toBe('charmander');
    });

    it('should handle malformed URLs', () => {
      expect(getPokemonNameFromUrl('invalid-url')).toBe('invalid-url');
      expect(getPokemonNameFromUrl('')).toBe('');
      expect(getPokemonNameFromUrl('https://pokeapi.co/api/v2/pokemon/')).toBe('pokemon');
    });
  });

  describe('formatPokemonId', () => {
    it('should format single digit IDs', () => {
      expect(formatPokemonId(1)).toBe('#001');
      expect(formatPokemonId(5)).toBe('#005');
      expect(formatPokemonId(9)).toBe('#009');
    });

    it('should format double digit IDs', () => {
      expect(formatPokemonId(10)).toBe('#010');
      expect(formatPokemonId(25)).toBe('#025');
      expect(formatPokemonId(99)).toBe('#099');
    });

    it('should format triple digit IDs', () => {
      expect(formatPokemonId(100)).toBe('#100');
      expect(formatPokemonId(150)).toBe('#150');
      expect(formatPokemonId(999)).toBe('#999');
    });

    it('should handle zero and negative numbers', () => {
      expect(formatPokemonId(0)).toBe('#000');
      expect(formatPokemonId(-5)).toBe('#0-5');
    });
  });

  describe('capitalizeFirst', () => {
    it('should capitalize first letter of strings', () => {
      expect(capitalizeFirst('bulbasaur')).toBe('Bulbasaur');
      expect(capitalizeFirst('charmander')).toBe('Charmander');
      expect(capitalizeFirst('pikachu')).toBe('Pikachu');
    });

    it('should handle single character strings', () => {
      expect(capitalizeFirst('a')).toBe('A');
      expect(capitalizeFirst('z')).toBe('Z');
    });

    it('should handle empty strings', () => {
      expect(capitalizeFirst('')).toBe('');
    });

    it('should handle already capitalized strings', () => {
      expect(capitalizeFirst('Pikachu')).toBe('Pikachu');
      expect(capitalizeFirst('BULBASAUR')).toBe('BULBASAUR');
    });
  });

  describe('getPokemonImageUrl', () => {
    it('should generate correct image URLs for valid IDs', () => {
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
      expect(getPokemonImageUrl(9999)).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9999.png');
    });
  });
});
