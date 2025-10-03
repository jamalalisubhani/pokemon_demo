import { configureStore } from '@reduxjs/toolkit';
import { addPokemonToCache, clearCache, pokemonSlice, setCachedPokemon, setError, setLoading } from '../src/store/slices/pokemonSlice';
import { Pokemon } from '../src/types';

// Mock StorageService
jest.mock('../src/services/storage', () => ({
  StorageService: {
    getPokemonCache: jest.fn(),
    setPokemonCache: jest.fn(),
  },
}));

describe('Pokemon Slice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        pokemon: pokemonSlice.reducer,
      },
    });
  });

  it('should handle initial state', () => {
    const state = (store.getState() as any).pokemon;
    expect(state.cachedPokemon).toEqual([]);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should handle setCachedPokemon', () => {
    const pokemon: Pokemon[] = [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    ];

    store.dispatch(setCachedPokemon(pokemon));
    const state = (store.getState() as any).pokemon;
    expect(state.cachedPokemon).toEqual(pokemon);
  });

  it('should handle addPokemonToCache', () => {
    const pokemon: Pokemon = { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' };

    store.dispatch(addPokemonToCache([pokemon]));
    const state = (store.getState() as any).pokemon;
    expect(state.cachedPokemon).toHaveLength(1);
    expect(state.cachedPokemon[0]).toEqual(pokemon);
  });

  it('should handle setLoading', () => {
    store.dispatch(setLoading(true));
    const state = (store.getState() as any).pokemon;
    expect(state.isLoading).toBe(true);
  });

  it('should handle setError', () => {
    const errorMessage = 'Test error';
    store.dispatch(setError(errorMessage));
    const state = (store.getState() as any).pokemon;
    expect(state.error).toBe(errorMessage);
  });

  it('should handle clearCache', () => {
    // First add some data
    const pokemon: Pokemon = { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' };
    store.dispatch(addPokemonToCache([pokemon]));
    
    // Then clear it
    store.dispatch(clearCache());
    const state = (store.getState() as any).pokemon;
    expect(state.cachedPokemon).toEqual([]);
  });

  it('should not add duplicate pokemon', () => {
    const pokemon: Pokemon = { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' };

    // Add the same pokemon twice
    store.dispatch(addPokemonToCache([pokemon]));
    store.dispatch(addPokemonToCache([pokemon]));

    const state = (store.getState() as any).pokemon;
    expect(state.cachedPokemon).toHaveLength(1);
  });
});
