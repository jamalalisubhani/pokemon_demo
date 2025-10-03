import { configureStore } from '@reduxjs/toolkit';
import { selectCachedPokemon, selectPokemonById, selectPokemonError, selectPokemonLoading } from '../src/store/selectors/pokemonSelectors';
import { pokemonSlice } from '../src/store/slices/pokemonSlice';
import { Pokemon } from '../src/types';

describe('Pokemon Selectors', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        pokemon: pokemonSlice.reducer,
      },
    });
  });

  describe('selectCachedPokemon', () => {
    it('should select cached Pokemon from state', () => {
      const mockPokemon: Pokemon[] = [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      ];

      store.dispatch({ type: 'pokemon/setCachedPokemon', payload: mockPokemon });
      const state = store.getState() as any;

      const result = selectCachedPokemon(state);
      expect(result).toEqual(mockPokemon);
    });

    it('should return empty array when no Pokemon cached', () => {
      const state = store.getState() as any;
      const result = selectCachedPokemon(state);
      expect(result).toEqual([]);
    });
  });

  describe('selectPokemonLoading', () => {
    it('should select loading state', () => {
      store.dispatch({ type: 'pokemon/setLoading', payload: true });
      const state = store.getState() as any;

      const result = selectPokemonLoading(state);
      expect(result).toBe(true);
    });

    it('should return false when not loading', () => {
      const state = store.getState() as any;
      const result = selectPokemonLoading(state);
      expect(result).toBe(false);
    });
  });

  describe('selectPokemonError', () => {
    it('should select error state', () => {
      const errorMessage = 'Test error';
      store.dispatch({ type: 'pokemon/setError', payload: errorMessage });
      const state = store.getState() as any;

      const result = selectPokemonError(state);
      expect(result).toBe(errorMessage);
    });

    it('should return null when no error', () => {
      const state = store.getState() as any;
      const result = selectPokemonError(state);
      expect(result).toBeNull();
    });
  });

  describe('selectPokemonById', () => {
    it('should select Pokemon by ID from URL', () => {
      const mockPokemon: Pokemon[] = [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      ];

      store.dispatch({ type: 'pokemon/setCachedPokemon', payload: mockPokemon });
      const state = store.getState() as any;

      const result = selectPokemonById(state, '1');
      expect(result).toEqual(mockPokemon[0]);
    });

    it('should return undefined when Pokemon not found', () => {
      const mockPokemon: Pokemon[] = [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      ];

      store.dispatch({ type: 'pokemon/setCachedPokemon', payload: mockPokemon });
      const state = store.getState() as any;

      const result = selectPokemonById(state, '999');
      expect(result).toBeUndefined();
    });

    it('should return undefined when no Pokemon cached', () => {
      const state = store.getState() as any;
      const result = selectPokemonById(state, '1');
      expect(result).toBeUndefined();
    });
  });
});
