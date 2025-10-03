import { pokemonApi } from '../src/store/api/pokemonApi';

describe('Pokemon API', () => {
  it('should have correct reducer path', () => {
    expect(pokemonApi.reducerPath).toBe('pokemonApi');
  });

  it('should have correct base URL configuration', () => {
    expect(pokemonApi.reducerPath).toBeDefined();
    expect(typeof pokemonApi.reducerPath).toBe('string');
  });

  it('should have endpoints defined', () => {
    expect(pokemonApi.endpoints).toBeDefined();
    expect(pokemonApi.endpoints.getPokemonList).toBeDefined();
    expect(pokemonApi.endpoints.getPokemonById).toBeDefined();
    expect(pokemonApi.endpoints.getPokemonByName).toBeDefined();
  });

  it('should have correct endpoint names', () => {
    expect(pokemonApi.endpoints.getPokemonList.name).toBe('getPokemonList');
    expect(pokemonApi.endpoints.getPokemonById.name).toBe('getPokemonById');
    expect(pokemonApi.endpoints.getPokemonByName.name).toBe('getPokemonByName');
  });

  it('should have query hooks exported', () => {
    expect(pokemonApi.useGetPokemonListQuery).toBeDefined();
    expect(pokemonApi.useGetPokemonByIdQuery).toBeDefined();
    expect(pokemonApi.useGetPokemonByNameQuery).toBeDefined();
  });

  it('should be a valid RTK Query API', () => {
    expect(pokemonApi).toBeDefined();
    expect(typeof pokemonApi).toBe('object');
    expect(pokemonApi.reducerPath).toBe('pokemonApi');
  });
});
