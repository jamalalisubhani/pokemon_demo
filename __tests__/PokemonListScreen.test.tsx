import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import PokemonListScreen from '../app/(tabs)/index';
import { pokemonApi } from '../src/store/api/pokemonApi';
import pokemonReducer from '../src/store/slices/pokemonSlice';

// Mock the router
const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
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

// Mock Pokemon data
const mockPokemonData = {
  count: 2,
  next: null,
  previous: null,
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
  ],
};

// Mock the API response
jest.mock('../src/store/api/pokemonApi', () => ({
  pokemonApi: {
    reducerPath: 'pokemonApi',
    reducer: jest.fn(),
    middleware: jest.fn(),
  },
  useGetPokemonListQuery: jest.fn(),
}));

const mockUseGetPokemonListQuery = require('../src/store/api/pokemonApi').useGetPokemonListQuery;

describe('PokemonListScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseGetPokemonListQuery.mockReturnValue({
      data: mockPokemonData,
      error: null,
      isLoading: false,
      refetch: jest.fn(),
    });
  });

  const renderWithProvider = (initialState = {}) => {
    const store = createTestStore(initialState);
    return render(
      <Provider store={store}>
        <PokemonListScreen />
      </Provider>
    );
  };

  it('renders Pokemon list correctly', () => {
    const store = createTestStore({
      pokemon: {
        cachedPokemon: mockPokemonData.results,
        isLoading: false,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <PokemonListScreen />
      </Provider>
    );

    expect(screen.getByText('Pokemon List')).toBeTruthy();
    expect(screen.getByText('bulbasaur')).toBeTruthy();
    expect(screen.getByText('ivysaur')).toBeTruthy();
  });

  it('displays loading state', () => {
    mockUseGetPokemonListQuery.mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
      refetch: jest.fn(),
    });

    renderWithProvider({
      pokemon: {
        cachedPokemon: [],
        isLoading: true,
        error: null,
      },
    });

    expect(screen.getByText('Pokemon List')).toBeTruthy();
  });

  it('displays error state', () => {
    mockUseGetPokemonListQuery.mockReturnValue({
      data: null,
      error: { message: 'Network error' },
      isLoading: false,
      refetch: jest.fn(),
    });

    renderWithProvider();

    expect(screen.getByText('Failed to load Pokemon list')).toBeTruthy();
    expect(screen.getByText('Retry')).toBeTruthy();
  });

  it('handles Pokemon item press', async () => {
    const store = createTestStore({
      pokemon: {
        cachedPokemon: mockPokemonData.results,
        isLoading: false,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <PokemonListScreen />
      </Provider>
    );

    const pokemonItem = screen.getByText('bulbasaur');
    fireEvent.press(pokemonItem);

    expect(mockPush).toHaveBeenCalledWith('/pokemon-detail?pokemonId=1&pokemonName=bulbasaur');
  });

  it('handles refresh', async () => {
    const mockRefetch = jest.fn();
    mockUseGetPokemonListQuery.mockReturnValue({
      data: mockPokemonData,
      error: null,
      isLoading: false,
      refetch: mockRefetch,
    });

    renderWithProvider({
      pokemon: {
        cachedPokemon: mockPokemonData.results,
        isLoading: false,
        error: null,
      },
    });

    const flatList = screen.getByTestId('flatlist') || screen.getByType('FlatList');
    fireEvent(flatList, 'refresh');

    await waitFor(() => {
      expect(mockRefetch).toHaveBeenCalled();
    });
  });

  it('handles load more', async () => {
    const mockRefetch = jest.fn();
    mockUseGetPokemonListQuery.mockReturnValue({
      data: { ...mockPokemonData, next: 'https://pokeapi.co/api/v2/pokemon/?offset=20' },
      error: null,
      isLoading: false,
      refetch: mockRefetch,
    });

    renderWithProvider({
      pokemon: {
        cachedPokemon: mockPokemonData.results,
        isLoading: false,
        error: null,
      },
    });

    const flatList = screen.getByTestId('flatlist') || screen.getByType('FlatList');
    fireEvent(flatList, 'endReached');

    await waitFor(() => {
      // The component should handle load more logic
    });
  });
});
