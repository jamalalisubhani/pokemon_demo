import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import PokemonDetailScreen from '../app/pokemon-detail';
import { pokemonApi } from '../src/store/api/pokemonApi';
import pokemonReducer from '../src/store/slices/pokemonSlice';

// Mock the router
jest.mock('expo-router', () => ({
  useLocalSearchParams: () => ({
    pokemonId: '1',
    pokemonName: 'bulbasaur',
  }),
}));

// Create a test store
const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      pokemon: pokemonReducer,
      [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
    preloadedState: {
      pokemon: {
        cachedPokemon: [],
        isLoading: false,
        error: null,
        ...initialState.pokemon,
      },
      ...initialState,
    },
  });
};

// Mock Pokemon detail data
const mockPokemonDetail = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  types: [
    {
      slot: 1,
      type: {
        name: 'grass',
        url: 'https://pokeapi.co/api/v2/type/12/',
      },
    },
    {
      slot: 2,
      type: {
        name: 'poison',
        url: 'https://pokeapi.co/api/v2/type/4/',
      },
    },
  ],
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',
    back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
    back_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png',
    other: {
      'official-artwork': {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
      },
    },
  },
  base_experience: 64,
  order: 1,
  is_default: true,
};

// Mock the API response
jest.mock('../src/store/api/pokemonApi', () => ({
  pokemonApi: {
    reducerPath: 'pokemonApi',
    reducer: jest.fn(),
    middleware: jest.fn(),
  },
  useGetPokemonByIdQuery: jest.fn(),
}));

const mockUseGetPokemonByIdQuery = require('../src/store/api/pokemonApi').useGetPokemonByIdQuery;

describe('PokemonDetailScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseGetPokemonByIdQuery.mockReturnValue({
      data: mockPokemonDetail,
      error: null,
      isLoading: false,
    });
  });

  const renderWithProvider = (initialState = {}) => {
    const store = createTestStore(initialState);
    return render(
      <Provider store={store}>
        <PokemonDetailScreen />
      </Provider>
    );
  };

  it('renders Pokemon details correctly', () => {
    renderWithProvider();

    expect(screen.getByText('bulbasaur')).toBeTruthy();
    expect(screen.getByText('#001')).toBeTruthy();
    expect(screen.getByText('70 cm')).toBeTruthy();
    expect(screen.getByText('6.9 kg')).toBeTruthy();
    expect(screen.getByText('64')).toBeTruthy();
    expect(screen.getByText('grass')).toBeTruthy();
    expect(screen.getByText('poison')).toBeTruthy();
  });

  it('displays loading state', () => {
    mockUseGetPokemonByIdQuery.mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    renderWithProvider();

    expect(screen.getByText('Loading Pokemon details...')).toBeTruthy();
  });

  it('displays error state', () => {
    mockUseGetPokemonByIdQuery.mockReturnValue({
      data: null,
      error: { message: 'Network error' },
      isLoading: false,
    });

    renderWithProvider();

    expect(screen.getByText('Failed to load Pokemon details')).toBeTruthy();
  });

  it('displays not found state', () => {
    mockUseGetPokemonByIdQuery.mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
    });

    renderWithProvider();

    expect(screen.getByText('Pokemon not found')).toBeTruthy();
  });

  it('formats height and weight correctly', () => {
    renderWithProvider();

    // Height: 7 * 10 = 70 cm
    expect(screen.getByText('70 cm')).toBeTruthy();
    // Weight: 69 / 10 = 6.9 kg
    expect(screen.getByText('6.9 kg')).toBeTruthy();
  });

  it('displays Pokemon types correctly', () => {
    renderWithProvider();

    expect(screen.getByText('grass')).toBeTruthy();
    expect(screen.getByText('poison')).toBeTruthy();
  });

  it('displays Pokemon image', () => {
    renderWithProvider();

    const image = screen.getByTestId('pokemon-image') || screen.getByType('Image');
    expect(image).toBeTruthy();
  });
});
