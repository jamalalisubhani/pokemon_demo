import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_CONFIG } from '../../constants/api';
import { PokemonDetail, PokemonListResponse } from '../../types';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
  }),
  tagTypes: ['Pokemon'],
  endpoints: (builder) => ({
    getPokemonList: builder.query<PokemonListResponse, { offset?: number; limit?: number }>({
      query: ({ offset = 0, limit = 20 } = {}) => ({
        url: '/pokemon/',
        params: { offset, limit },
      }),
      providesTags: ['Pokemon'],
    }),
    getPokemonById: builder.query<PokemonDetail, number>({
      query: (id) => `/pokemon/${id}`,
      providesTags: (result, error, id) => [{ type: 'Pokemon', id }],
    }),
    getPokemonByName: builder.query<PokemonDetail, string>({
      query: (name) => `/pokemon/${name}`,
      providesTags: (result, error, name) => [{ type: 'Pokemon', id: name }],
    }),
  }),
});

export const {
  useGetPokemonListQuery,
  useGetPokemonByIdQuery,
  useGetPokemonByNameQuery,
} = pokemonApi;

// Alias for consistency
export const useGetPokemonDetailQuery = useGetPokemonByIdQuery;
