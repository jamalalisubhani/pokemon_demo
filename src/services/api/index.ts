// API service configuration and utilities
export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_POKEAPI_BASE_URL || 'https://pokeapi.co/api/v2',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

export const API_ENDPOINTS = {
  POKEMON_LIST: '/pokemon',
  POKEMON_DETAIL: (id: string) => `/pokemon/${id}`,
  POKEMON_SPECIES: (id: string) => `/pokemon-species/${id}`,
} as const;

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleApiError = (error: any): ApiError => {
  if (error.response) {
    return new ApiError(
      `API Error: ${error.response.status}`,
      error.response.status,
      error.response.data
    );
  } else if (error.request) {
    return new ApiError('Network Error: No response received');
  } else {
    return new ApiError(`Request Error: ${error.message}`);
  }
};
