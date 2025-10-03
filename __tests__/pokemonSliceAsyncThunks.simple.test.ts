import { configureStore } from '@reduxjs/toolkit';
import {
    loadCachedPokemon,
    pokemonSlice,
    savePokemonToCache
} from '../src/store/slices/pokemonSlice';

// Mock StorageService
jest.mock('../src/services/storage', () => ({
  StorageService: {
    getPokemonCache: jest.fn(),
    setPokemonCache: jest.fn(),
  },
}));

describe('Pokemon Slice Async Thunks', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        pokemon: pokemonSlice.reducer,
      },
    });
  });

  describe('loadCachedPokemon', () => {
    it('should create async thunk with correct properties', () => {
      expect(loadCachedPokemon).toBeDefined();
      expect(loadCachedPokemon.pending).toBeDefined();
      expect(loadCachedPokemon.fulfilled).toBeDefined();
      expect(loadCachedPokemon.rejected).toBeDefined();
    });

    it('should have correct type prefix', () => {
      expect(loadCachedPokemon.typePrefix).toBe('pokemon/loadCachedPokemon');
    });
  });

  describe('savePokemonToCache', () => {
    it('should create async thunk with correct properties', () => {
      expect(savePokemonToCache).toBeDefined();
      expect(savePokemonToCache.pending).toBeDefined();
      expect(savePokemonToCache.fulfilled).toBeDefined();
      expect(savePokemonToCache.rejected).toBeDefined();
    });

    it('should have correct type prefix', () => {
      expect(savePokemonToCache.typePrefix).toBe('pokemon/savePokemonToCache');
    });
  });

  describe('Async Thunk Action Creators', () => {
    it('should create pending actions', () => {
      const loadPending = loadCachedPokemon.pending('', undefined);
      const savePending = savePokemonToCache.pending('', []);

      expect(loadPending.type).toBe('pokemon/loadCachedPokemon/pending');
      expect(savePending.type).toBe('pokemon/savePokemonToCache/pending');
    });

    it('should create fulfilled actions', () => {
      const loadFulfilled = loadCachedPokemon.fulfilled([], '', undefined);
      const saveFulfilled = savePokemonToCache.fulfilled([], '', []);

      expect(loadFulfilled.type).toBe('pokemon/loadCachedPokemon/fulfilled');
      expect(saveFulfilled.type).toBe('pokemon/savePokemonToCache/fulfilled');
    });

    it('should create rejected actions', () => {
      const loadRejected = loadCachedPokemon.rejected(new Error('test'), '', undefined, 'test');
      const saveRejected = savePokemonToCache.rejected(new Error('test'), '', [], 'test');

      expect(loadRejected.type).toBe('pokemon/loadCachedPokemon/rejected');
      expect(saveRejected.type).toBe('pokemon/savePokemonToCache/rejected');
    });
  });
});
