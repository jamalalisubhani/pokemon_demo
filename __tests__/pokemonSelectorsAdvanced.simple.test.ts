import { RootState } from '../src/store';
import {
    selectHasPokemonData,
    selectPokemonById,
    selectPokemonByName,
    selectPokemonCount,
    selectPokemonState
} from '../src/store/selectors/pokemonSelectors';
import { Pokemon } from '../src/types';

describe('Pokemon Selectors Advanced', () => {
  const mockPokemon: Pokemon[] = [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
  ];

  const createMockState = (pokemonState: any): RootState => ({
    pokemon: pokemonState,
    pokemonApi: {
      queries: {},
      mutations: {},
      provided: { tags: {}, keys: {} },
      subscriptions: {},
      config: {
        reducerPath: 'pokemonApi',
        online: true,
        focused: true,
        middlewareRegistered: true,
      },
    },
  } as any);

  describe('selectPokemonState', () => {
    it('should return the entire pokemon state', () => {
      const state = createMockState({
        cachedPokemon: mockPokemon,
        isLoading: true,
        error: 'Test error',
      });
      const result = selectPokemonState(state);
      expect(result).toEqual({
        cachedPokemon: mockPokemon,
        isLoading: true,
        error: 'Test error',
      });
    });
  });

  describe('selectPokemonById', () => {
    it('should find pokemon by ID', () => {
      const state = createMockState({
        cachedPokemon: mockPokemon,
        isLoading: false,
        error: null,
      });
      const result = selectPokemonById(state, '1');
      expect(result).toEqual(mockPokemon[0]);
    });

    it('should find pokemon by different ID', () => {
      const state = createMockState({
        cachedPokemon: mockPokemon,
        isLoading: false,
        error: null,
      });
      const result = selectPokemonById(state, '4');
      expect(result).toEqual(mockPokemon[1]);
    });

    it('should return undefined for non-existent ID', () => {
      const state = createMockState({
        cachedPokemon: mockPokemon,
        isLoading: false,
        error: null,
      });
      const result = selectPokemonById(state, '999');
      expect(result).toBeUndefined();
    });
  });

  describe('selectPokemonByName', () => {
    it('should find pokemon by name', () => {
      const state = createMockState({
        cachedPokemon: mockPokemon,
        isLoading: false,
        error: null,
      });
      const result = selectPokemonByName(state, 'bulbasaur');
      expect(result).toEqual(mockPokemon[0]);
    });

    it('should find pokemon by different name', () => {
      const state = createMockState({
        cachedPokemon: mockPokemon,
        isLoading: false,
        error: null,
      });
      const result = selectPokemonByName(state, 'charmander');
      expect(result).toEqual(mockPokemon[1]);
    });

    it('should return undefined for non-existent name', () => {
      const state = createMockState({
        cachedPokemon: mockPokemon,
        isLoading: false,
        error: null,
      });
      const result = selectPokemonByName(state, 'pikachu');
      expect(result).toBeUndefined();
    });
  });

  describe('selectPokemonCount', () => {
    it('should return correct count for empty list', () => {
      const state = createMockState({
        cachedPokemon: [],
        isLoading: false,
        error: null,
      });
      const result = selectPokemonCount(state);
      expect(result).toBe(0);
    });

    it('should return correct count for populated list', () => {
      const state = createMockState({
        cachedPokemon: mockPokemon,
        isLoading: false,
        error: null,
      });
      const result = selectPokemonCount(state);
      expect(result).toBe(3);
    });
  });

  describe('selectHasPokemonData', () => {
    it('should return false for empty list', () => {
      const state = createMockState({
        cachedPokemon: [],
        isLoading: false,
        error: null,
      });
      const result = selectHasPokemonData(state);
      expect(result).toBe(false);
    });

    it('should return true for populated list', () => {
      const state = createMockState({
        cachedPokemon: mockPokemon,
        isLoading: false,
        error: null,
      });
      const result = selectHasPokemonData(state);
      expect(result).toBe(true);
    });

    it('should return true for single pokemon', () => {
      const state = createMockState({
        cachedPokemon: [mockPokemon[0]],
        isLoading: false,
        error: null,
      });
      const result = selectHasPokemonData(state);
      expect(result).toBe(true);
    });
  });
});
