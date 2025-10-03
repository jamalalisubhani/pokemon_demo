import { isValidPokemonUrl, validatePokemonId, validatePokemonName } from '../src/utils/validation';

describe('Validation Utils', () => {
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
    });
  });
});
