import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { useRouter } from 'expo-router';
import React from 'react';
import { usePokemonDetail } from '../src/hooks/pokemon/usePokemonDetail';
import { usePokemonList } from '../src/hooks/pokemon/usePokemonList';
import PokemonDetailScreen from '../src/screens/pokemon/PokemonDetailScreen';
import PokemonListScreen from '../src/screens/pokemon/PokemonListScreen';

// Mock the dependencies
jest.mock('../src/hooks/pokemon/usePokemonList');
jest.mock('../src/hooks/pokemon/usePokemonDetail');
jest.mock('expo-router');
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children, ...props }: any) => children,
}));

const mockUsePokemonList = usePokemonList as jest.MockedFunction<typeof usePokemonList>;
const mockUsePokemonDetail = usePokemonDetail as jest.MockedFunction<typeof usePokemonDetail>;
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

describe('Pokemon Screen Integration', () => {
  const mockPush = jest.fn();
  const mockBack = jest.fn();
  const mockRefetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({
      push: mockPush,
      back: mockBack,
      replace: jest.fn(),
      canGoBack: jest.fn(),
      dismiss: jest.fn(),
      dismissAll: jest.fn(),
    } as any);
  });

  describe('List to Detail Navigation Flow', () => {
    it('should navigate from list to detail screen with correct parameters', () => {
      const mockPokemonList = [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
      ];

      mockUsePokemonList.mockReturnValue({
        pokemonList: mockPokemonList,
        isLoading: false,
        error: null,
        refetch: mockRefetch,
        hasData: true,
      });

      const { getByText } = render(<PokemonListScreen />);
      
      // Click on Bulbasaur
      const bulbasaurCard = getByText('Bulbasaur');
      fireEvent.press(bulbasaurCard);
      
      expect(mockPush).toHaveBeenCalledWith('/pokemon-detail?pokemonId=1&pokemonName=bulbasaur');
    });

    it('should navigate from list to detail screen with different Pokemon', () => {
      const mockPokemonList = [
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
      ];

      mockUsePokemonList.mockReturnValue({
        pokemonList: mockPokemonList,
        isLoading: false,
        error: null,
        refetch: mockRefetch,
        hasData: true,
      });

      const { getByText } = render(<PokemonListScreen />);
      
      // Click on Pikachu
      const pikachuCard = getByText('Pikachu');
      fireEvent.press(pikachuCard);
      
      expect(mockPush).toHaveBeenCalledWith('/pokemon-detail?pokemonId=25&pokemonName=pikachu');
    });
  });

  describe('Detail Screen Data Flow', () => {
    const mockPokemonDetail = {
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      base_experience: 64,
      order: 1,
      is_default: true,
      types: [
        {
          slot: 1,
          type: {
            name: 'grass',
            url: 'https://pokeapi.co/api/v2/type/12/',
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
    };

    it('should display Pokemon details correctly when data is loaded', () => {
      mockUsePokemonDetail.mockReturnValue({
        pokemonDetail: mockPokemonDetail,
        isLoading: false,
        error: null,
        refetch: mockRefetch,
      });

      const { getByText } = render(<PokemonDetailScreen pokemonName="bulbasaur" />);
      
      expect(getByText('Bulbasaur')).toBeTruthy();
      expect(getByText('#001')).toBeTruthy();
      expect(getByText('70 cm')).toBeTruthy();
      expect(getByText('6.9 kg')).toBeTruthy();
      expect(getByText('64')).toBeTruthy();
      expect(getByText('Grass')).toBeTruthy();
    });

    it('should handle back navigation from detail screen', () => {
      mockUsePokemonDetail.mockReturnValue({
        pokemonDetail: mockPokemonDetail,
        isLoading: false,
        error: null,
        refetch: mockRefetch,
      });

      const { getByText } = render(<PokemonDetailScreen />);
      
      const backButton = getByText('←');
      fireEvent.press(backButton);
      
      expect(mockBack).toHaveBeenCalled();
    });
  });

  describe('Error Handling Flow', () => {
    it('should handle list loading error and retry', async () => {
      mockUsePokemonList.mockReturnValue({
        pokemonList: [],
        isLoading: false,
        error: 'Network error',
        refetch: mockRefetch,
        hasData: false,
      });

      const { getByText } = render(<PokemonListScreen />);
      
      expect(getByText('Failed to load Pokemon list')).toBeTruthy();
      
      const retryButton = getByText('Retry');
      fireEvent.press(retryButton);
      
      await waitFor(() => {
        expect(mockRefetch).toHaveBeenCalled();
      });
    });

    it('should handle detail loading error and retry', async () => {
      mockUsePokemonDetail.mockReturnValue({
        pokemonDetail: undefined,
        isLoading: false,
        error: 'Network error',
        refetch: mockRefetch,
      });

      const { getByText } = render(<PokemonDetailScreen />);
      
      expect(getByText('Failed to load Pokemon details')).toBeTruthy();
      
      const retryButton = getByText('Retry');
      fireEvent.press(retryButton);
      
      await waitFor(() => {
        expect(mockRefetch).toHaveBeenCalled();
      });
    });
  });

  describe('Loading States Flow', () => {
    it('should show loading state for list screen', () => {
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

    it('should show loading state for detail screen', () => {
      mockUsePokemonDetail.mockReturnValue({
        pokemonDetail: undefined,
        isLoading: true,
        error: null,
        refetch: mockRefetch,
      });

      const { getByText } = render(<PokemonDetailScreen />);
      
      expect(getByText('Loading Pokemon details...')).toBeTruthy();
    });
  });

  describe('Data Consistency', () => {
    it('should maintain data consistency between list and detail screens', () => {
      const mockPokemonList = [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      ];

      const mockPokemonDetail = {
        id: 1,
        name: 'bulbasaur',
        height: 7,
        weight: 69,
        base_experience: 64,
        order: 1,
        is_default: true,
        types: [
          {
            slot: 1,
            type: {
              name: 'grass',
              url: 'https://pokeapi.co/api/v2/type/12/',
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
      };

      // Test list screen
      mockUsePokemonList.mockReturnValue({
        pokemonList: mockPokemonList,
        isLoading: false,
        error: null,
        refetch: mockRefetch,
        hasData: true,
      });

      const { getByText: getByTextList } = render(<PokemonListScreen />);
      expect(getByTextList('Bulbasaur')).toBeTruthy();

      // Test detail screen
      mockUsePokemonDetail.mockReturnValue({
        pokemonDetail: mockPokemonDetail,
        isLoading: false,
        error: null,
        refetch: mockRefetch,
      });

      const { getByText: getByTextDetail } = render(<PokemonDetailScreen pokemonName="bulbasaur" />);
      expect(getByTextDetail('Bulbasaur')).toBeTruthy();
      expect(getByTextDetail('#001')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
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

    it('should handle Pokemon not found in detail screen', () => {
      mockUsePokemonDetail.mockReturnValue({
        pokemonDetail: undefined,
        isLoading: false,
        error: null,
        refetch: mockRefetch,
      });

      const { getByText } = render(<PokemonDetailScreen />);
      expect(getByText('Pokemon not found')).toBeTruthy();
    });

    it('should handle missing pokemonId parameter', () => {
      mockUsePokemonDetail.mockReturnValue({
        pokemonDetail: undefined,
        isLoading: false,
        error: null,
        refetch: mockRefetch,
      });

      const { getByText } = render(<PokemonDetailScreen />);
      expect(getByText('Pokemon not found')).toBeTruthy();
    });
  });
});
