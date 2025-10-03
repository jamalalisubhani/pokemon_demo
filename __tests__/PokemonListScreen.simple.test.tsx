import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { useRouter } from 'expo-router';
import React from 'react';
import { usePokemonList } from '../src/hooks/pokemon/usePokemonList';
import PokemonListScreen from '../src/screens/pokemon/PokemonListScreen';

// Mock the dependencies
jest.mock('../src/hooks/pokemon/usePokemonList');
jest.mock('expo-router');
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children, ...props }: any) => children,
}));

const mockUsePokemonList = usePokemonList as jest.MockedFunction<typeof usePokemonList>;
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

describe('PokemonListScreen', () => {
  const mockPush = jest.fn();
  const mockRefetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({
      push: mockPush,
      back: jest.fn(),
      replace: jest.fn(),
      canGoBack: jest.fn(),
      dismiss: jest.fn(),
      dismissAll: jest.fn(),
    } as any);
  });

  describe('Loading State', () => {
    it('should show loading spinner when loading and no data', () => {
      mockUsePokemonList.mockReturnValue({
        pokemonList: [],
        isLoading: true,
        error: null,
        refetch: mockRefetch,
        hasData: false,
      });

      const { getByText } = render(<PokemonListScreen />);
      expect(getByText('Loading Pokemon...')).toBeTruthy();
    });

    it('should show loading footer when loading more data', () => {
      mockUsePokemonList.mockReturnValue({
        pokemonList: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }],
        isLoading: true,
        error: null,
        refetch: mockRefetch,
        hasData: true,
      });

      const { getByText } = render(<PokemonListScreen />);
      expect(getByText('Loading more Pokemon...')).toBeTruthy();
    });
  });

  describe('Error State', () => {
    it('should show error message when there is an error', () => {
      mockUsePokemonList.mockReturnValue({
        pokemonList: [],
        isLoading: false,
        error: 'Network error',
        refetch: mockRefetch,
        hasData: false,
      });

      const { getByText } = render(<PokemonListScreen />);
      expect(getByText('Failed to load Pokemon list')).toBeTruthy();
    });

    it('should show retry button when there is an error', () => {
      mockUsePokemonList.mockReturnValue({
        pokemonList: [],
        isLoading: false,
        error: 'Network error',
        refetch: mockRefetch,
        hasData: false,
      });

      const { getByText } = render(<PokemonListScreen />);
      expect(getByText('Retry')).toBeTruthy();
    });

    it('should call refetch when retry button is pressed', async () => {
      mockUsePokemonList.mockReturnValue({
        pokemonList: [],
        isLoading: false,
        error: 'Network error',
        refetch: mockRefetch,
        hasData: false,
      });

      const { getByText } = render(<PokemonListScreen />);
      const retryButton = getByText('Retry');
      
      fireEvent.press(retryButton);
      
      await waitFor(() => {
        expect(mockRefetch).toHaveBeenCalled();
      });
    });
  });

  describe('Success State', () => {
    const mockPokemonList = [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
      { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
    ];

    beforeEach(() => {
      mockUsePokemonList.mockReturnValue({
        pokemonList: mockPokemonList,
        isLoading: false,
        error: null,
        refetch: mockRefetch,
        hasData: true,
      });
    });

    it('should render Pokemon list', () => {
      const { getByText } = render(<PokemonListScreen />);
      expect(getByText('Bulbasaur')).toBeTruthy();
      expect(getByText('Charmander')).toBeTruthy();
      expect(getByText('Squirtle')).toBeTruthy();
    });

    it('should navigate to detail screen when Pokemon is pressed', () => {
      const { getByText } = render(<PokemonListScreen />);
      const bulbasaurCard = getByText('Bulbasaur');
      
      fireEvent.press(bulbasaurCard);
      
      expect(mockPush).toHaveBeenCalledWith('/pokemon-detail?pokemonId=1&pokemonName=bulbasaur');
    });

    it('should handle load more when end is reached', () => {
      const { getByTestId } = render(<PokemonListScreen />);
      const flatList = getByTestId('pokemon-list');
      
      fireEvent(flatList, 'onEndReached');
      
      // This would trigger the handleLoadMore function
      // The actual implementation would depend on how the FlatList is configured
    });
  });

  describe('Refresh Functionality', () => {
    it('should handle refresh when pull to refresh is triggered', async () => {
      mockUsePokemonList.mockReturnValue({
        pokemonList: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }],
        isLoading: false,
        error: null,
        refetch: mockRefetch,
        hasData: true,
      });

      const { getByTestId } = render(<PokemonListScreen />);
      const flatList = getByTestId('pokemon-list');
      
      fireEvent(flatList, 'onRefresh');
      
      await waitFor(() => {
        expect(mockRefetch).toHaveBeenCalled();
      });
    });
  });

  describe('Empty State', () => {
    it('should handle empty Pokemon list', () => {
      mockUsePokemonList.mockReturnValue({
        pokemonList: [],
        isLoading: false,
        error: null,
        refetch: mockRefetch,
        hasData: false,
      });

      const { queryByText } = render(<PokemonListScreen />);
      expect(queryByText('Bulbasaur')).toBeNull();
    });
  });

  describe('Navigation', () => {
    it('should extract Pokemon ID correctly from URL', () => {
      const mockPokemonList = [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      ];

      mockUsePokemonList.mockReturnValue({
        pokemonList: mockPokemonList,
        isLoading: false,
        error: null,
        refetch: mockRefetch,
        hasData: true,
      });

      const { getByText } = render(<PokemonListScreen />);
      const bulbasaurCard = getByText('Bulbasaur');
      
      fireEvent.press(bulbasaurCard);
      
      expect(mockPush).toHaveBeenCalledWith('/pokemon-detail?pokemonId=1&pokemonName=bulbasaur');
    });

    it('should handle Pokemon with different URL formats', () => {
      const mockPokemonList = [
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25' },
      ];

      mockUsePokemonList.mockReturnValue({
        pokemonList: mockPokemonList,
        isLoading: false,
        error: null,
        refetch: mockRefetch,
        hasData: true,
      });

      const { getByText } = render(<PokemonListScreen />);
      const pikachuCard = getByText('Pikachu');
      
      fireEvent.press(pikachuCard);
      
      expect(mockPush).toHaveBeenCalledWith('/pokemon-detail?pokemonId=25&pokemonName=pikachu');
    });
  });
});
