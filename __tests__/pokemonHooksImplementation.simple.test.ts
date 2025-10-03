// Test the actual implementation of hooks without React dependencies
import { usePokemonDetail } from '../src/hooks/pokemon/usePokemonDetail';
import { usePokemonList } from '../src/hooks/pokemon/usePokemonList';

// Mock the dependencies
jest.mock('../src/store/api/pokemonApi', () => ({
  useGetPokemonListQuery: jest.fn(),
  useGetPokemonDetailQuery: jest.fn(),
}));

jest.mock('../src/hooks/common/useAppDispatch', () => ({
  useAppDispatch: jest.fn(() => jest.fn()),
}));

jest.mock('../src/hooks/common/useAppSelector', () => ({
  useAppSelector: jest.fn(),
}));

// Mock React hooks
jest.mock('react', () => ({
  useEffect: jest.fn(),
}));

describe('Pokemon Hooks Implementation', () => {
  const mockDispatch = jest.fn();
  const mockSelector = jest.fn();
  const mockUseEffect = require('react').useEffect;

  beforeEach(() => {
    jest.clearAllMocks();
    require('../src/hooks/common/useAppDispatch').useAppDispatch.mockReturnValue(mockDispatch);
    require('../src/hooks/common/useAppSelector').useAppSelector.mockImplementation(mockSelector);
    mockUseEffect.mockImplementation((fn: any) => fn());
  });

  describe('usePokemonList', () => {
    it('should call useGetPokemonListQuery with correct parameters', () => {
      const mockUseGetPokemonListQuery = require('../src/store/api/pokemonApi').useGetPokemonListQuery;
      mockUseGetPokemonListQuery.mockReturnValue({
        data: { results: [] },
        error: null,
        isLoading: false,
        refetch: jest.fn(),
      });

      mockSelector.mockReturnValue({
        cachedPokemon: [],
        isLoading: false,
        error: null,
      });

      usePokemonList(0);

      expect(mockUseGetPokemonListQuery).toHaveBeenCalledWith({ offset: 0 });
    });

    it('should return correct structure', () => {
      const mockUseGetPokemonListQuery = require('../src/store/api/pokemonApi').useGetPokemonListQuery;
      mockUseGetPokemonListQuery.mockReturnValue({
        data: { results: [] },
        error: null,
        isLoading: false,
        refetch: jest.fn(),
      });

      mockSelector.mockReturnValue({
        cachedPokemon: [],
        isLoading: false,
        error: null,
      });

      const result = usePokemonList(0);

      expect(result).toHaveProperty('pokemonList');
      expect(result).toHaveProperty('isLoading');
      expect(result).toHaveProperty('error');
      expect(result).toHaveProperty('refetch');
      expect(result).toHaveProperty('hasData');
    });
  });

  describe('usePokemonDetail', () => {
    it('should call useGetPokemonDetailQuery with correct parameters', () => {
      const mockUseGetPokemonDetailQuery = require('../src/store/api/pokemonApi').useGetPokemonDetailQuery;
      mockUseGetPokemonDetailQuery.mockReturnValue({
        data: undefined,
        error: null,
        isLoading: false,
        refetch: jest.fn(),
      });

      mockSelector.mockReturnValue({
        isLoading: false,
        error: null,
      });

      usePokemonDetail('1');

      expect(mockUseGetPokemonDetailQuery).toHaveBeenCalledWith(1);
    });

    it('should return correct structure', () => {
      const mockUseGetPokemonDetailQuery = require('../src/store/api/pokemonApi').useGetPokemonDetailQuery;
      mockUseGetPokemonDetailQuery.mockReturnValue({
        data: undefined,
        error: null,
        isLoading: false,
        refetch: jest.fn(),
      });

      mockSelector.mockReturnValue({
        isLoading: false,
        error: null,
      });

      const result = usePokemonDetail('1');

      expect(result).toHaveProperty('pokemonDetail');
      expect(result).toHaveProperty('isLoading');
      expect(result).toHaveProperty('error');
      expect(result).toHaveProperty('refetch');
    });
  });
});
