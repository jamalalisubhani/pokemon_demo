import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/common/useAppDispatch';
import { useAppSelector } from '../../hooks/common/useAppSelector';
import { useGetPokemonListQuery } from '../../store/api/pokemonApi';
import { addPokemonToCache, setCachedPokemon, setError, setLoading } from '../../store/slices/pokemonSlice';

export const usePokemonList = (offset: number = 0) => {
  const dispatch = useAppDispatch();
  const { cachedPokemon, isLoading, error } = useAppSelector((state: any) => state.pokemon);
  
  const {
    data: pokemonList,
    error: queryError,
    isLoading: isQueryLoading,
    refetch,
  } = useGetPokemonListQuery({ offset });

  useEffect(() => {
    if (pokemonList) {
      if (offset === 0) {
        // First page or refresh - replace data
        dispatch(setCachedPokemon(pokemonList.results));
      } else {
        // Subsequent pages - append data
        dispatch(addPokemonToCache(pokemonList.results));
      }
    }
  }, [pokemonList, dispatch, offset]);

  useEffect(() => {
    dispatch(setLoading(isQueryLoading));
  }, [isQueryLoading, dispatch]);

  useEffect(() => {
    if (queryError) {
      dispatch(setError('Failed to fetch Pokemon list'));
    }
  }, [queryError, dispatch]);

  return {
    pokemonList: cachedPokemon,
    isLoading,
    error,
    refetch,
    hasData: cachedPokemon.length > 0,
  };
};
