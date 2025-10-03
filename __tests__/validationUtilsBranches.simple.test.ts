import {
    isValidPokemonData,
    isValidPokemonDetail,
    isValidPokemonUrl,
    validatePokemonId,
    validatePokemonList,
    validatePokemonName
} from '../src/utils/validation';

describe('Validation Utils Branches', () => {
  describe('isValidPokemonData branch coverage', () => {
    it('should return true for valid data', () => {
      const validData = {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/'
      };
      expect(isValidPokemonData(validData)).toBe(true);
    });

    it('should return false for null', () => {
      expect(isValidPokemonData(null)).toBeFalsy();
    });

    it('should return false for undefined', () => {
      expect(isValidPokemonData(undefined)).toBeFalsy();
    });

    it('should return false for empty object', () => {
      expect(isValidPokemonData({})).toBeFalsy();
    });

    it('should return false for missing name', () => {
      const invalidData = { url: 'https://pokeapi.co/api/v2/pokemon/1/' };
      expect(isValidPokemonData(invalidData)).toBeFalsy();
    });

    it('should return false for missing url', () => {
      const invalidData = { name: 'bulbasaur' };
      expect(isValidPokemonData(invalidData)).toBeFalsy();
    });

    it('should return false for empty name', () => {
      const invalidData = { name: '', url: 'https://pokeapi.co/api/v2/pokemon/1/' };
      expect(isValidPokemonData(invalidData)).toBeFalsy();
    });

    it('should return false for invalid url', () => {
      const invalidData = { name: 'bulbasaur', url: 'https://example.com/creature/1/' };
      expect(isValidPokemonData(invalidData)).toBeFalsy();
    });
  });

  describe('isValidPokemonDetail branch coverage', () => {
    it('should return true for valid detail data', () => {
      const validData = {
        id: 1,
        name: 'bulbasaur',
        height: 7,
        weight: 69,
        types: [],
        sprites: {},
        base_experience: 64,
        order: 1,
        is_default: true,
      };
      expect(isValidPokemonDetail(validData)).toBe(true);
    });

    it('should return false for null', () => {
      expect(isValidPokemonDetail(null)).toBeFalsy();
    });

    it('should return false for undefined', () => {
      expect(isValidPokemonDetail(undefined)).toBeFalsy();
    });

    it('should return false for empty object', () => {
      expect(isValidPokemonDetail({})).toBeFalsy();
    });

    it('should return false for missing id', () => {
      const invalidData = { name: 'bulbasaur', height: 7, weight: 69, types: [], sprites: {} };
      expect(isValidPokemonDetail(invalidData)).toBeFalsy();
    });

    it('should return false for invalid id type', () => {
      const invalidData = { id: '1', name: 'bulbasaur', height: 7, weight: 69, types: [], sprites: {} };
      expect(isValidPokemonDetail(invalidData)).toBeFalsy();
    });
  });

  describe('validatePokemonList branch coverage', () => {
    it('should return true for valid list data', () => {
      const validData = {
        count: 1,
        next: null,
        previous: null,
        results: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }]
      };
      expect(validatePokemonList(validData)).toBe(true);
    });

    it('should return false for null', () => {
      expect(validatePokemonList(null)).toBeFalsy();
    });

    it('should return false for undefined', () => {
      expect(validatePokemonList(undefined)).toBeFalsy();
    });

    it('should return false for empty object', () => {
      expect(validatePokemonList({})).toBeFalsy();
    });

    it('should return false for missing count', () => {
      const invalidData = { results: [] };
      expect(validatePokemonList(invalidData)).toBeFalsy();
    });

    it('should return false for missing results', () => {
      const invalidData = { count: 1 };
      expect(validatePokemonList(invalidData)).toBeFalsy();
    });

    it('should return false for invalid count type', () => {
      const invalidData = { count: '1', results: [] };
      expect(validatePokemonList(invalidData)).toBeFalsy();
    });

    it('should return false for invalid results type', () => {
      const invalidData = { count: 1, results: 'not-array' };
      expect(validatePokemonList(invalidData)).toBeFalsy();
    });
  });

  describe('isValidPokemonUrl branch coverage', () => {
    it('should return true for valid URL', () => {
      expect(isValidPokemonUrl('https://pokeapi.co/api/v2/pokemon/1/')).toBe(true);
    });

    it('should return false for URL without trailing slash', () => {
      expect(isValidPokemonUrl('https://pokeapi.co/api/v2/pokemon/1')).toBe(false);
    });

    it('should return false for wrong domain', () => {
      expect(isValidPokemonUrl('https://example.com/pokemon/1/')).toBe(false);
    });

    it('should return false for invalid URL', () => {
      expect(isValidPokemonUrl('invalid-url')).toBe(false);
    });
  });

  describe('validatePokemonId branch coverage', () => {
    it('should return true for valid ID', () => {
      expect(validatePokemonId('1')).toBe(true);
      expect(validatePokemonId('150')).toBe(true);
    });

    it('should return false for zero', () => {
      expect(validatePokemonId('0')).toBe(false);
    });

    it('should return false for negative', () => {
      expect(validatePokemonId('-1')).toBe(false);
    });

    it('should return false for non-numeric', () => {
      expect(validatePokemonId('abc')).toBe(false);
    });

    it('should return false for decimal', () => {
      expect(validatePokemonId('1.5')).toBe(false);
    });
  });

  describe('validatePokemonName branch coverage', () => {
    it('should return true for valid name', () => {
      expect(validatePokemonName('bulbasaur')).toBe(true);
      expect(validatePokemonName('pikachu')).toBe(true);
    });

    it('should return false for empty string', () => {
      expect(validatePokemonName('')).toBe(false);
    });

    it('should return false for uppercase', () => {
      expect(validatePokemonName('Bulbasaur')).toBe(false);
    });

    it('should return false for special characters', () => {
      expect(validatePokemonName('b-lbasaur')).toBe(false);
    });

    it('should return false for numbers', () => {
      expect(validatePokemonName('123pokemon')).toBe(false);
    });
  });
});
