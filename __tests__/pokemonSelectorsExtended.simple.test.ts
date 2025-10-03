import { RootState } from '../src/store';
import { selectCachedPokemon, selectPokemonError, selectPokemonLoading } from '../src/store/selectors/pokemonSelectors';
import { Pokemon } from '../src/types';

describe('Pokemon Selectors Extended', () => {
  const mockPokemon: Pokemon[] = [
    { name: 'bulbasaur', url: 'url1' },
    { name: 'charmander', url: 'url2' },
    { name: 'squirtle', url: 'url3' },
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

  describe('selectCachedPokemon', () => {
    it('should return empty array for initial state', () => {
      const state = createMockState({
        cachedPokemon: [],
        isLoading: false,
        error: null,
      });
      const result = selectCachedPokemon(state);
      expect(result).toEqual([]);
    });

    it('should return cached pokemon list', () => {
      const state = createMockState({
        cachedPokemon: mockPokemon,
        isLoading: false,
        error: null,
      });
      const result = selectCachedPokemon(state);
      expect(result).toEqual(mockPokemon);
    });

    it('should return single pokemon in cache', () => {
      const singlePokemon = [mockPokemon[0]];
      const state = createMockState({
        cachedPokemon: singlePokemon,
        isLoading: false,
        error: null,
      });
      const result = selectCachedPokemon(state);
      expect(result).toEqual(singlePokemon);
      expect(result).toHaveLength(1);
    });
  });

  describe('selectPokemonLoading', () => {
    it('should return false for initial state', () => {
      const state = createMockState({
        cachedPokemon: [],
        isLoading: false,
        error: null,
      });
      const result = selectPokemonLoading(state);
      expect(result).toBe(false);
    });

    it('should return true when loading', () => {
      const state = createMockState({
        cachedPokemon: [],
        isLoading: true,
        error: null,
      });
      const result = selectPokemonLoading(state);
      expect(result).toBe(true);
    });

    it('should return false when not loading', () => {
      const state = createMockState({
        cachedPokemon: mockPokemon,
        isLoading: false,
        error: null,
      });
      const result = selectPokemonLoading(state);
      expect(result).toBe(false);
    });
  });

  describe('selectPokemonError', () => {
    it('should return null for initial state', () => {
      const state = createMockState({
        cachedPokemon: [],
        isLoading: false,
        error: null,
      });
      const result = selectPokemonError(state);
      expect(result).toBeNull();
    });

    it('should return error message when error exists', () => {
      const errorMessage = 'Failed to fetch Pokemon data';
      const state = createMockState({
        cachedPokemon: [],
        isLoading: false,
        error: errorMessage,
      });
      const result = selectPokemonError(state);
      expect(result).toBe(errorMessage);
    });

    it('should return different error messages', () => {
      const errorMessages = [
        'Network error',
        'API timeout',
        'Invalid response',
        'Server error'
      ];

      errorMessages.forEach(errorMessage => {
        const state = createMockState({
          cachedPokemon: [],
          isLoading: false,
          error: errorMessage,
        });
        const result = selectPokemonError(state);
        expect(result).toBe(errorMessage);
      });
    });
  });

  describe('Selector Edge Cases', () => {
    it('should handle undefined pokemon state', () => {
      const state = {
        pokemon: undefined,
        pokemonApi: {
          queries: {},
          mutations: {},
          provided: {},
          subscriptions: {},
          config: {
            reducerPath: 'pokemonApi',
            keepUnusedDataFor: 60,
            refetchOnMountOrArgChange: false,
            refetchOnReconnect: false,
            refetchOnFocus: false,
          },
        },
      } as any;

      expect(() => selectCachedPokemon(state)).toThrow();
      expect(() => selectPokemonLoading(state)).toThrow();
      expect(() => selectPokemonError(state)).toThrow();
    });

    it('should handle partial pokemon state', () => {
      const state = createMockState({
        cachedPokemon: mockPokemon,
        // Missing isLoading and error
      } as any);

      const result = selectCachedPokemon(state);
      expect(result).toEqual(mockPokemon);
    });
  });
});
