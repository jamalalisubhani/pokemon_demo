export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_POKEAPI_BASE_URL || 'https://pokeapi.co/api/v2',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  CACHE_TIME: 5 * 60 * 1000, // 5 minutes
} as const;

export const API_ENDPOINTS = {
  POKEMON_LIST: '/pokemon',
  POKEMON_DETAIL: (id: string) => `/pokemon/${id}`,
  POKEMON_SPECIES: (id: string) => `/pokemon-species/${id}`,
} as const;

export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;
