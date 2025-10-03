import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StorageService } from '../../services/storage';
import { Pokemon } from '../../types';

interface PokemonState {
  cachedPokemon: Pokemon[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  cachedPokemon: [],
  isLoading: false,
  error: null,
};

// Remove the storage key constant as it's now in StorageService

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setCachedPokemon: (state, action: PayloadAction<Pokemon[]>) => {
      state.cachedPokemon = action.payload;
    },
    addPokemonToCache: (state, action: PayloadAction<Pokemon[]>) => {
      action.payload.forEach(pokemon => {
        const existingIndex = state.cachedPokemon.findIndex(
          (cachedPokemon) => cachedPokemon.name === pokemon.name
        );
        if (existingIndex === -1) {
          state.cachedPokemon.push(pokemon);
        } else {
          state.cachedPokemon[existingIndex] = pokemon;
        }
      });
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearCache: (state) => {
      state.cachedPokemon = [];
    },
  },
});

export const {
  setCachedPokemon,
  addPokemonToCache,
  setLoading,
  setError,
  clearCache,
} = pokemonSlice.actions;

// Async thunks for persistent storage
export const loadCachedPokemon = createAsyncThunk(
  'pokemon/loadCachedPokemon',
  async (_, { rejectWithValue }) => {
    try {
      const cachedData = await StorageService.getPokemonCache();
      return cachedData || [];
    } catch {
      return rejectWithValue('Failed to load cached Pokemon data');
    }
  }
);

export const savePokemonToCache = createAsyncThunk(
  'pokemon/savePokemonToCache',
  async (pokemon: Pokemon[], { rejectWithValue }) => {
    try {
      const success = await StorageService.setPokemonCache(pokemon);
      if (!success) {
        throw new Error('Failed to save to storage');
      }
      return pokemon;
    } catch {
      return rejectWithValue('Failed to save Pokemon data');
    }
  }
);

export default pokemonSlice.reducer;
