import {
    capitalizeFirst,
    extractPokemonId,
    formatPokemonId,
    getPokemonImageUrl,
    getPokemonNameFromUrl
} from '../src/utils/pokemon';

describe('Pokemon Utils Branches', () => {
  describe('extractPokemonId branch coverage', () => {
    it('should handle URLs with trailing slash', () => {
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
    });

    it('should handle URLs with query parameters', () => {
      expect(extractPokemonId('https://pokeapi.co/api/v2/pokemon/1/?param=value')).toBe('?param=value');
    });
  });

  describe('getPokemonNameFromUrl branch coverage', () => {
    it('should handle URLs with trailing slash', () => {
      expect(getPokemonNameFromUrl('https://pokeapi.co/api/v2/pokemon/bulbasaur/')).toBe('bulbasaur');
      expect(getPokemonNameFromUrl('https://pokeapi.co/api/v2/pokemon/charmander/')).toBe('charmander');
    });

    it('should handle URLs without trailing slash', () => {
      expect(getPokemonNameFromUrl('https://pokeapi.co/api/v2/pokemon/bulbasaur')).toBe('bulbasaur');
      expect(getPokemonNameFromUrl('https://pokeapi.co/api/v2/pokemon/charmander')).toBe('charmander');
    });

    it('should handle malformed URLs', () => {
      expect(getPokemonNameFromUrl('invalid-url')).toBe('invalid-url');
      expect(getPokemonNameFromUrl('')).toBe('');
    });
  });

  describe('formatPokemonId branch coverage', () => {
    it('should handle single digit IDs', () => {
      expect(formatPokemonId(1)).toBe('#001');
      expect(formatPokemonId(5)).toBe('#005');
      expect(formatPokemonId(9)).toBe('#009');
    });

    it('should handle double digit IDs', () => {
      expect(formatPokemonId(10)).toBe('#010');
      expect(formatPokemonId(25)).toBe('#025');
      expect(formatPokemonId(99)).toBe('#099');
    });

    it('should handle triple digit IDs', () => {
      expect(formatPokemonId(100)).toBe('#100');
      expect(formatPokemonId(150)).toBe('#150');
      expect(formatPokemonId(999)).toBe('#999');
    });

    it('should handle zero and negative numbers', () => {
      expect(formatPokemonId(0)).toBe('#000');
      expect(formatPokemonId(-5)).toBe('#0-5');
    });
  });

  describe('capitalizeFirst branch coverage', () => {
    it('should handle normal strings', () => {
      expect(capitalizeFirst('bulbasaur')).toBe('Bulbasaur');
      expect(capitalizeFirst('charmander')).toBe('Charmander');
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

  describe('getPokemonImageUrl branch coverage', () => {
    it('should handle positive IDs', () => {
      expect(getPokemonImageUrl(1)).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png');
      expect(getPokemonImageUrl(25)).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png');
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
