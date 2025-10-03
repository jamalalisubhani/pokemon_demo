import { RootState } from '../index';

export const selectPokemonState = (state: RootState) => state.pokemon;

export const selectCachedPokemon = (state: RootState) => state.pokemon.cachedPokemon;

export const selectPokemonLoading = (state: RootState) => state.pokemon.isLoading;

export const selectPokemonError = (state: RootState) => state.pokemon.error;

export const selectPokemonById = (state: RootState, id: string) => 
  state.pokemon.cachedPokemon.find(pokemon => pokemon.url.includes(`/${id}/`));

export const selectPokemonByName = (state: RootState, name: string) =>
  state.pokemon.cachedPokemon.find(pokemon => pokemon.name === name);

export const selectPokemonCount = (state: RootState) => state.pokemon.cachedPokemon.length;

export const selectHasPokemonData = (state: RootState) => state.pokemon.cachedPokemon.length > 0;
