import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { usePokemonDetail } from '../src/hooks/pokemon/usePokemonDetail';
import PokemonDetailScreen from '../src/screens/pokemon/PokemonDetailScreen';

// Mock the dependencies
jest.mock('../src/hooks/pokemon/usePokemonDetail');
jest.mock('expo-router');
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children, ...props }: any) => children,
}));

const mockUsePokemonDetail = usePokemonDetail as jest.MockedFunction<typeof usePokemonDetail>;
const mockUseLocalSearchParams = useLocalSearchParams as jest.MockedFunction<typeof useLocalSearchParams>;
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

describe('PokemonDetailScreen', () => {
  const mockBack = jest.fn();
  const mockRefetch = jest.fn();

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
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseLocalSearchParams.mockReturnValue({
      pokemonId: '1',
    });
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      back: mockBack,
      replace: jest.fn(),
      canGoBack: jest.fn(),
      dismiss: jest.fn(),
      dismissAll: jest.fn(),
    } as any);
  });

  describe('Loading State', () => {
    it('should show loading spinner when loading', () => {
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

  describe('Error State', () => {
    it('should show error message when there is an error', () => {
      mockUsePokemonDetail.mockReturnValue({
        pokemonDetail: undefined,
        isLoading: false,
        error: 'Network error',
        refetch: mockRefetch,
      });

      const { getByText } = render(<PokemonDetailScreen />);
      expect(getByText('Failed to load Pokemon details')).toBeTruthy();
    });

    it('should show retry button when there is an error', () => {
      mockUsePokemonDetail.mockReturnValue({
        pokemonDetail: undefined,
        isLoading: false,
        error: 'Network error',
        refetch: mockRefetch,
      });

      const { getByText } = render(<PokemonDetailScreen />);
      expect(getByText('Retry')).toBeTruthy();
    });

    it('should call refetch when retry button is pressed', async () => {
      mockUsePokemonDetail.mockReturnValue({
        pokemonDetail: undefined,
        isLoading: false,
        error: 'Network error',
        refetch: mockRefetch,
      });

      const { getByText } = render(<PokemonDetailScreen />);
      const retryButton = getByText('Retry');
      
      fireEvent.press(retryButton);
      
      await waitFor(() => {
        expect(mockRefetch).toHaveBeenCalled();
      });
    });
  });

  describe('Not Found State', () => {
    it('should show not found message when Pokemon is not found', () => {
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

  describe('Success State', () => {
    beforeEach(() => {
      mockUsePokemonDetail.mockReturnValue({
        pokemonDetail: mockPokemonDetail,
        isLoading: false,
        error: null,
        refetch: mockRefetch,
      });
    });

    it('should render Pokemon details correctly', () => {
      const { getByText } = render(<PokemonDetailScreen />);
      
      expect(getByText('#001')).toBeTruthy();
      expect(getByText('Bulbasaur')).toBeTruthy();
      expect(getByText('70 cm')).toBeTruthy();
      expect(getByText('6.9 kg')).toBeTruthy();
      expect(getByText('64')).toBeTruthy();
    });

    it('should render Pokemon types correctly', () => {
      const { getByText } = render(<PokemonDetailScreen />);
      
      expect(getByText('Grass')).toBeTruthy();
      expect(getByText('Poison')).toBeTruthy();
    });

    it('should render Pokemon image', () => {
      const { getByTestId } = render(<PokemonDetailScreen />);
      const image = getByTestId('pokemon-image');
      
      expect(image).toBeTruthy();
      expect(image.props.source.uri).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png');
    });

    it('should show custom header with Pokemon name when provided', () => {
      const { getByText } = render(<PokemonDetailScreen pokemonName="bulbasaur" />);
      
      expect(getByText('Bulbasaur')).toBeTruthy();
    });

    it('should show default header title when Pokemon name is not provided', () => {
      const { getByText } = render(<PokemonDetailScreen />);
      
      expect(getByText('Pokemon Details')).toBeTruthy();
    });
  });

  describe('Navigation', () => {
    beforeEach(() => {
      mockUsePokemonDetail.mockReturnValue({
        pokemonDetail: mockPokemonDetail,
        isLoading: false,
        error: null,
        refetch: mockRefetch,
      });
    });

    it('should navigate back when back button is pressed', () => {
      const { getByText } = render(<PokemonDetailScreen />);
      const backButton = getByText('←');
      
      fireEvent.press(backButton);
      
      expect(mockBack).toHaveBeenCalled();
    });
  });

  describe('Pokemon with Single Type', () => {
    const singleTypePokemon = {
      ...mockPokemonDetail,
      types: [
        {
          slot: 1,
          type: {
            name: 'fire',
            url: 'https://pokeapi.co/api/v2/type/10/',
          },
        },
      ],
    };

    it('should render single type correctly', () => {
      mockUsePokemonDetail.mockReturnValue({
        pokemonDetail: singleTypePokemon,
        isLoading: false,
        error: null,
        refetch: mockRefetch,
      });

      const { getByText } = render(<PokemonDetailScreen />);
      
      expect(getByText('Fire')).toBeTruthy();
    });
  });

  describe('Pokemon with No Types', () => {
    const noTypePokemon = {
      ...mockPokemonDetail,
      types: [],
    };

    it('should handle Pokemon with no types', () => {
      mockUsePokemonDetail.mockReturnValue({
        pokemonDetail: noTypePokemon,
        isLoading: false,
        error: null,
        refetch: mockRefetch,
      });

      const { getByText } = render(<PokemonDetailScreen />);
      
      expect(getByText('Types')).toBeTruthy();
      // Should not crash when rendering empty types array
    });
  });

  describe('Different Pokemon IDs', () => {
    it('should handle different Pokemon IDs', () => {
      mockUseLocalSearchParams.mockReturnValue({
        pokemonId: '25',
      });

      const pikachuDetail = {
        ...mockPokemonDetail,
        id: 25,
        name: 'pikachu',
      };

      mockUsePokemonDetail.mockReturnValue({
        pokemonDetail: pikachuDetail,
        isLoading: false,
        error: null,
        refetch: mockRefetch,
      });

      const { getByText } = render(<PokemonDetailScreen />);
      
      expect(getByText('#025')).toBeTruthy();
      expect(getByText('Pikachu')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing pokemonId parameter', () => {
      mockUseLocalSearchParams.mockReturnValue({
        pokemonId: undefined,
      });

      mockUsePokemonDetail.mockReturnValue({
        pokemonDetail: undefined,
        isLoading: false,
        error: null,
        refetch: mockRefetch,
      });

      const { getByText } = render(<PokemonDetailScreen />);
      expect(getByText('Pokemon not found')).toBeTruthy();
    });

    it('should handle Pokemon with missing sprites', () => {
      const pokemonWithoutSprites = {
        ...mockPokemonDetail,
        sprites: {
          front_default: '',
          front_shiny: '',
          back_default: '',
          back_shiny: '',
          other: {
            'official-artwork': {
              front_default: '',
            },
          },
        },
      };

      mockUsePokemonDetail.mockReturnValue({
        pokemonDetail: pokemonWithoutSprites,
        isLoading: false,
        error: null,
        refetch: mockRefetch,
      });

      const { getByTestId } = render(<PokemonDetailScreen />);
      const image = getByTestId('pokemon-image');
      
      expect(image).toBeTruthy();
      expect(image.props.source.uri).toBe('');
    });
  });
});
