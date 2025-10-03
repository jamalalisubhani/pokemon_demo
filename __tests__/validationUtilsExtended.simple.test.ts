import {
    isValidPokemonData,
    isValidPokemonDetail,
    isValidPokemonUrl,
    validatePokemonId,
    validatePokemonList,
    validatePokemonName
} from '../src/utils/validation';

describe('Validation Utils Extended', () => {
  describe('isValidPokemonData', () => {
    it('should validate correct Pokemon data', () => {
      const validData = {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/'
      };
      expect(isValidPokemonData(validData)).toBe(true);
    });

    it('should reject invalid Pokemon data', () => {
      expect(isValidPokemonData(null)).toBeFalsy();
      expect(isValidPokemonData(undefined)).toBeFalsy();
      expect(isValidPokemonData({})).toBeFalsy();
      expect(isValidPokemonData({ name: 'bulbasaur' })).toBeFalsy();
      expect(isValidPokemonData({ url: 'https://pokeapi.co/api/v2/pokemon/1/' })).toBeFalsy();
      expect(isValidPokemonData({ name: '', url: 'https://pokeapi.co/api/v2/pokemon/1/' })).toBeFalsy();
      expect(isValidPokemonData({ name: 'bulbasaur', url: 'https://example.com/creature/1/' })).toBeFalsy();
    });

    it('should handle edge cases', () => {
      expect(isValidPokemonData({ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1' })).toBe(true);
      expect(isValidPokemonData({ name: 'a', url: 'https://pokeapi.co/api/v2/pokemon/1/' })).toBe(true);
    });
  });

  describe('isValidPokemonDetail', () => {
    it('should validate correct Pokemon detail data', () => {
      const validData = {
        id: 1,
        name: 'bulbasaur',
        height: 7,
        weight: 69,
        types: [],
        sprites: {}
      };
      expect(isValidPokemonDetail(validData)).toBe(true);
    });

    it('should reject invalid Pokemon detail data', () => {
      expect(isValidPokemonDetail(null)).toBeFalsy();
      expect(isValidPokemonDetail(undefined)).toBeFalsy();
      expect(isValidPokemonDetail({})).toBeFalsy();
      expect(isValidPokemonDetail({ id: 1 })).toBeFalsy();
      expect(isValidPokemonDetail({ id: '1', name: 'bulbasaur', height: 7, weight: 69, types: [], sprites: {} })).toBeFalsy();
      expect(isValidPokemonDetail({ id: 1, name: 123, height: 7, weight: 69, types: [], sprites: {} })).toBeFalsy();
      expect(isValidPokemonDetail({ id: 1, name: 'bulbasaur', height: '7', weight: 69, types: [], sprites: {} })).toBeFalsy();
      expect(isValidPokemonDetail({ id: 1, name: 'bulbasaur', height: 7, weight: '69', types: [], sprites: {} })).toBeFalsy();
      expect(isValidPokemonDetail({ id: 1, name: 'bulbasaur', height: 7, weight: 69, types: 'not-array', sprites: {} })).toBeFalsy();
      expect(isValidPokemonDetail({ id: 1, name: 'bulbasaur', height: 7, weight: 69, types: [], sprites: 'not-object' })).toBeFalsy();
    });
  });

  describe('validatePokemonList', () => {
    it('should validate correct Pokemon list data', () => {
      const validData = {
        count: 151,
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
        ]
      };
      expect(validatePokemonList(validData)).toBe(true);
    });

    it('should reject invalid Pokemon list data', () => {
      expect(validatePokemonList(null)).toBeFalsy();
      expect(validatePokemonList(undefined)).toBeFalsy();
      expect(validatePokemonList({})).toBeFalsy();
      expect(validatePokemonList({ count: 151 })).toBeFalsy();
      expect(validatePokemonList({ results: [] })).toBeFalsy();
      expect(validatePokemonList({ count: '151', results: [] })).toBeFalsy();
      expect(validatePokemonList({ count: 151, results: 'not-array' })).toBeFalsy();
      expect(validatePokemonList({ 
        count: 151, 
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'invalid' } // Missing url
        ]
      })).toBeFalsy();
    });

    it('should handle empty results', () => {
      const validData = {
        count: 0,
        results: []
      };
      expect(validatePokemonList(validData)).toBe(true);
    });
  });

  describe('isValidPokemonUrl', () => {
    it('should validate correct Pokemon URLs', () => {
      expect(isValidPokemonUrl('https://pokeapi.co/api/v2/pokemon/1/')).toBe(true);
      expect(isValidPokemonUrl('https://pokeapi.co/api/v2/pokemon/bulbasaur/')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(isValidPokemonUrl('https://pokeapi.co/api/v2/type/1/')).toBe(false);
      expect(isValidPokemonUrl('https://example.com/pokemon/1/')).toBe(false);
      expect(isValidPokemonUrl('invalid-url')).toBe(false);
      expect(isValidPokemonUrl('')).toBe(false);
      expect(isValidPokemonUrl('https://pokeapi.co/api/v2/pokemon/1')).toBe(false);
    });
  });

  describe('validatePokemonId', () => {
    it('should validate correct Pokemon IDs', () => {
      expect(validatePokemonId('1')).toBe(true);
      expect(validatePokemonId('150')).toBe(true);
      expect(validatePokemonId('1000')).toBe(true);
    });

    it('should reject invalid IDs', () => {
      expect(validatePokemonId('0')).toBe(false);
      expect(validatePokemonId('-1')).toBe(false);
      expect(validatePokemonId('abc')).toBe(false);
      expect(validatePokemonId('')).toBe(false);
      expect(validatePokemonId('1.5')).toBe(false);
      expect(validatePokemonId('1a')).toBe(false);
    });
  });

  describe('validatePokemonName', () => {
    it('should validate correct Pokemon names', () => {
      expect(validatePokemonName('bulbasaur')).toBe(true);
      expect(validatePokemonName('pikachu')).toBe(true);
      expect(validatePokemonName('charizard')).toBe(true);
    });

    it('should reject invalid names', () => {
      expect(validatePokemonName('')).toBe(false);
      expect(validatePokemonName('123')).toBe(false);
      expect(validatePokemonName('bulba-saur')).toBe(false);
      expect(validatePokemonName('BULBASAUR')).toBe(false);
      expect(validatePokemonName('bulbasaur123')).toBe(false);
      expect(validatePokemonName('bulba_saur')).toBe(false);
    });
  });
});
