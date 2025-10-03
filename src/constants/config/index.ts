export const APP_CONFIG = {
  NAME: 'Pokemon Demo',
  VERSION: '1.0.0',
  ENVIRONMENT: process.env.NODE_ENV || 'development',
} as const;

export const STORAGE_KEYS = {
  POKEMON_CACHE: 'pokemon_cache',
  FAVORITES: 'favorite_pokemon',
  SETTINGS: 'app_settings',
} as const;

export const POKEMON_CONFIG = {
  IMAGE_BASE_URL: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork',
  DEFAULT_IMAGE: '/placeholder.png',
  MAX_POKEMON_ID: 1010,
} as const;
