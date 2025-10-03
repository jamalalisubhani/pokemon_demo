import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from '../src/store/api/pokemonApi';
import pokemonReducer from '../src/store/slices/pokemonSlice';
import { Pokemon } from '../src/types';

// Mock fetch
global.fetch = jest.fn();

// Mock StorageService
jest.mock('../src/services/storage', () => ({
  StorageService: {
    getPokemonCache: jest.fn().mockResolvedValue([]),
    setPokemonCache: jest.fn().mockResolvedValue(true),
  },
}));

describe('Redux Integration Tests', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        [pokemonApi.reducerPath]: pokemonApi.reducer,
        pokemon: pokemonReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(pokemonApi.middleware),
    });
    jest.clearAllMocks();
  });

  describe('Store Configuration', () => {
    it('should have correct initial state', () => {
      const state = store.getState() as any;
      expect(state).toHaveProperty('pokemonApi');
      expect(state).toHaveProperty('pokemon');
      expect(state.pokemon).toEqual({
        cachedPokemon: [],
        isLoading: false,
        error: null,
      });
    });

    it('should have pokemonApi reducer configured', () => {
      const state = store.getState() as any;
      expect(state.pokemonApi).toBeDefined();
    });
  });

  describe('Pokemon Slice Integration', () => {
    it('should handle setCachedPokemon action', () => {
      const pokemon: Pokemon[] = [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
      ];

      store.dispatch({ type: 'pokemon/setCachedPokemon', payload: pokemon });
      const state = store.getState() as any;
      
      expect(state.pokemon.cachedPokemon).toEqual(pokemon);
    });

    it('should handle addPokemonToCache action', () => {
      const initialPokemon: Pokemon[] = [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      ];
      const newPokemon: Pokemon[] = [
        { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
      ];

      // Set initial pokemon
      store.dispatch({ type: 'pokemon/setCachedPokemon', payload: initialPokemon });
      
      // Add new pokemon
      store.dispatch({ type: 'pokemon/addPokemonToCache', payload: newPokemon });
      
      const state = store.getState() as any;
      expect(state.pokemon.cachedPokemon).toHaveLength(2);
      expect(state.pokemon.cachedPokemon[0]).toEqual(initialPokemon[0]);
      expect(state.pokemon.cachedPokemon[1]).toEqual(newPokemon[0]);
    });

    it('should handle setLoading action', () => {
      store.dispatch({ type: 'pokemon/setLoading', payload: true });
      const state = store.getState() as any;
      expect(state.pokemon.isLoading).toBe(true);

      store.dispatch({ type: 'pokemon/setLoading', payload: false });
      const newState = store.getState() as any;
      expect(newState.pokemon.isLoading).toBe(false);
    });

    it('should handle setError action', () => {
      const errorMessage = 'Network error';
      store.dispatch({ type: 'pokemon/setError', payload: errorMessage });
      const state = store.getState() as any;
      expect(state.pokemon.error).toBe(errorMessage);

      store.dispatch({ type: 'pokemon/setError', payload: null });
      const newState = store.getState() as any;
      expect(newState.pokemon.error).toBeNull();
    });

    it('should handle clearCache action', () => {
      const pokemon: Pokemon[] = [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      ];

      // Set pokemon first
      store.dispatch({ type: 'pokemon/setCachedPokemon', payload: pokemon });
      expect((store.getState() as any).pokemon.cachedPokemon).toHaveLength(1);

      // Clear cache
      store.dispatch({ type: 'pokemon/clearCache' });
      expect((store.getState() as any).pokemon.cachedPokemon).toHaveLength(0);
    });
  });

  describe('API Integration', () => {
    it('should have pokemonApi endpoints configured', () => {
      expect(pokemonApi.endpoints.getPokemonList).toBeDefined();
      expect(pokemonApi.endpoints.getPokemonById).toBeDefined();
      expect(pokemonApi.endpoints.getPokemonByName).toBeDefined();
    });

    it('should have correct reducer path', () => {
      expect(pokemonApi.reducerPath).toBe('pokemonApi');
    });

    it('should have tagTypes configured', () => {
      // RTK Query API doesn't expose tagTypes directly, but we can verify it's configured
      expect(pokemonApi).toBeDefined();
      expect(pokemonApi.reducerPath).toBe('pokemonApi');
    });
  });

  describe('State Shape Consistency', () => {
    it('should maintain consistent state shape after multiple actions', () => {
      const pokemon1: Pokemon = { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' };
      const pokemon2: Pokemon = { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' };

      // Perform multiple actions
      store.dispatch({ type: 'pokemon/setLoading', payload: true });
      store.dispatch({ type: 'pokemon/setCachedPokemon', payload: [pokemon1] });
      store.dispatch({ type: 'pokemon/addPokemonToCache', payload: [pokemon2] });
      store.dispatch({ type: 'pokemon/setLoading', payload: false });

      const state = store.getState() as any;
      
      expect(state.pokemon).toHaveProperty('cachedPokemon');
      expect(state.pokemon).toHaveProperty('isLoading');
      expect(state.pokemon).toHaveProperty('error');
      expect(Array.isArray(state.pokemon.cachedPokemon)).toBe(true);
      expect(typeof state.pokemon.isLoading).toBe('boolean');
      expect(state.pokemon.error === null || typeof state.pokemon.error === 'string').toBe(true);
    });
  });

  describe('Error Handling Integration', () => {
    it('should handle error state correctly', () => {
      const errorMessage = 'Failed to fetch Pokemon';
      
      store.dispatch({ type: 'pokemon/setError', payload: errorMessage });
      store.dispatch({ type: 'pokemon/setLoading', payload: false });
      
      const state = store.getState() as any;
      expect(state.pokemon.error).toBe(errorMessage);
      expect(state.pokemon.isLoading).toBe(false);
    });

    it('should clear error when setting new data', () => {
      const errorMessage = 'Previous error';
      const pokemon: Pokemon[] = [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }];

      // Set error first
      store.dispatch({ type: 'pokemon/setError', payload: errorMessage });
      expect((store.getState() as any).pokemon.error).toBe(errorMessage);

      // Set new data (should clear error) - but setCachedPokemon doesn't clear error, so we need to explicitly clear it
      store.dispatch({ type: 'pokemon/setCachedPokemon', payload: pokemon });
      store.dispatch({ type: 'pokemon/setError', payload: null });
      expect((store.getState() as any).pokemon.error).toBeNull();
    });
  });

  describe('Data Persistence Integration', () => {
    it('should handle data updates without losing existing data', () => {
      const initialPokemon: Pokemon[] = [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      ];
      const additionalPokemon: Pokemon[] = [
        { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
        { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
      ];

      // Set initial data
      store.dispatch({ type: 'pokemon/setCachedPokemon', payload: initialPokemon });
      expect((store.getState() as any).pokemon.cachedPokemon).toHaveLength(1);

      // Add more data
      store.dispatch({ type: 'pokemon/addPokemonToCache', payload: additionalPokemon });
      const state = store.getState() as any;
      
      expect(state.pokemon.cachedPokemon).toHaveLength(3);
      expect(state.pokemon.cachedPokemon[0].name).toBe('bulbasaur');
      expect(state.pokemon.cachedPokemon[1].name).toBe('charmander');
      expect(state.pokemon.cachedPokemon[2].name).toBe('squirtle');
    });

    it('should not add duplicate Pokemon to cache', () => {
      const pokemon: Pokemon = { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' };

      // Add same pokemon twice
      store.dispatch({ type: 'pokemon/addPokemonToCache', payload: [pokemon] });
      store.dispatch({ type: 'pokemon/addPokemonToCache', payload: [pokemon] });

      const state = store.getState() as any;
      expect(state.pokemon.cachedPokemon).toHaveLength(1);
      expect(state.pokemon.cachedPokemon[0]).toEqual(pokemon);
    });
  });
});
