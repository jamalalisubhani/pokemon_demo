import { pokemonApi } from '../src/store/api/pokemonApi';

describe('Pokemon API Extended', () => {
  describe('API Configuration', () => {
    it('should have correct reducer path', () => {
      expect(pokemonApi.reducerPath).toBe('pokemonApi');
    });

    it('should be a valid API object', () => {
      expect(pokemonApi).toBeDefined();
      expect(typeof pokemonApi).toBe('object');
    });
  });

  describe('Endpoint Configuration', () => {
    it('should have getPokemonList endpoint with correct configuration', () => {
      const endpoint = pokemonApi.endpoints.getPokemonList;
      expect(endpoint).toBeDefined();
      expect(endpoint.name).toBe('getPokemonList');
    });

    it('should have getPokemonById endpoint with correct configuration', () => {
      const endpoint = pokemonApi.endpoints.getPokemonById;
      expect(endpoint).toBeDefined();
      expect(endpoint.name).toBe('getPokemonById');
    });

    it('should have getPokemonByName endpoint with correct configuration', () => {
      const endpoint = pokemonApi.endpoints.getPokemonByName;
      expect(endpoint).toBeDefined();
      expect(endpoint.name).toBe('getPokemonByName');
    });
  });

  describe('Query Hooks', () => {
    it('should export useGetPokemonListQuery hook', () => {
      expect(pokemonApi.useGetPokemonListQuery).toBeDefined();
      expect(typeof pokemonApi.useGetPokemonListQuery).toBe('function');
    });

    it('should export useGetPokemonByIdQuery hook', () => {
      expect(pokemonApi.useGetPokemonByIdQuery).toBeDefined();
      expect(typeof pokemonApi.useGetPokemonByIdQuery).toBe('function');
    });

    it('should export useGetPokemonByNameQuery hook', () => {
      expect(pokemonApi.useGetPokemonByNameQuery).toBeDefined();
      expect(typeof pokemonApi.useGetPokemonByNameQuery).toBe('function');
    });
  });

  describe('API Structure', () => {
    it('should be a valid RTK Query API object', () => {
      expect(pokemonApi).toBeDefined();
      expect(typeof pokemonApi).toBe('object');
      expect(pokemonApi.reducerPath).toBe('pokemonApi');
      expect(pokemonApi.endpoints).toBeDefined();
    });

    it('should have all required RTK Query properties', () => {
      const requiredProperties = [
        'reducerPath',
        'endpoints',
        'reducer',
        'middleware',
        'util'
      ];

      requiredProperties.forEach(prop => {
        expect(pokemonApi).toHaveProperty(prop);
      });
    });
  });
});
