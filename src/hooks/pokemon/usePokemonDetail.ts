import { useEffect } from 'react';
import { useGetPokemonDetailQuery } from '../../store/api/pokemonApi';
import { setError, setLoading } from '../../store/slices/pokemonSlice';
import { useAppDispatch } from '../common/useAppDispatch';
import { useAppSelector } from '../common/useAppSelector';

export const usePokemonDetail = (pokemonId: string) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.pokemon);
  
  const {
    data: pokemonDetail,
    error: queryError,
    isLoading: isQueryLoading,
    refetch,
  } = useGetPokemonDetailQuery(parseInt(pokemonId, 10));

  useEffect(() => {
    dispatch(setLoading(isQueryLoading));
  }, [isQueryLoading, dispatch]);

  useEffect(() => {
    if (queryError) {
      dispatch(setError('Failed to fetch Pokemon details'));
    }
  }, [queryError, dispatch]);

  return {
    pokemonDetail,
    isLoading,
    error,
    refetch,
    hasData: !!pokemonDetail,
  };
};
