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

describe('Pokemon Hooks Branches Advanced', () => {
  const mockDispatch = jest.fn();
  const mockSelector = jest.fn();
  const mockUseEffect = require('react').useEffect;

  beforeEach(() => {
    jest.clearAllMocks();
    require('../src/hooks/common/useAppDispatch').useAppDispatch.mockReturnValue(mockDispatch);
    require('../src/hooks/common/useAppSelector').useAppSelector.mockImplementation(mockSelector);
    mockUseEffect.mockImplementation((fn: any) => fn());
  });

  describe('usePokemonList branch coverage', () => {
    it('should handle pokemonList data', () => {
      const mockUseGetPokemonListQuery = require('../src/store/api/pokemonApi').useGetPokemonListQuery;
      mockUseGetPokemonListQuery.mockReturnValue({
        data: { results: [{ name: 'bulbasaur', url: 'url1' }] },
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
      expect(mockDispatch).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should handle no pokemonList data', () => {
      const mockUseGetPokemonListQuery = require('../src/store/api/pokemonApi').useGetPokemonListQuery;
      mockUseGetPokemonListQuery.mockReturnValue({
        data: undefined,
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
      expect(mockDispatch).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should handle query error', () => {
      const mockUseGetPokemonListQuery = require('../src/store/api/pokemonApi').useGetPokemonListQuery;
      mockUseGetPokemonListQuery.mockReturnValue({
        data: undefined,
        error: 'Network error',
        isLoading: false,
        refetch: jest.fn(),
      });

      mockSelector.mockReturnValue({
        cachedPokemon: [],
        isLoading: false,
        error: null,
      });

      usePokemonList(0);
      expect(mockDispatch).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  describe('usePokemonDetail branch coverage', () => {
    it('should handle loading state', () => {
      const mockUseGetPokemonDetailQuery = require('../src/store/api/pokemonApi').useGetPokemonDetailQuery;
      mockUseGetPokemonDetailQuery.mockReturnValue({
        data: undefined,
        error: null,
        isLoading: true,
        refetch: jest.fn(),
      });

      mockSelector.mockReturnValue({
        isLoading: false,
        error: null,
      });

      usePokemonDetail('1');
      expect(mockDispatch).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should handle error state', () => {
      const mockUseGetPokemonDetailQuery = require('../src/store/api/pokemonApi').useGetPokemonDetailQuery;
      mockUseGetPokemonDetailQuery.mockReturnValue({
        data: undefined,
        error: 'Network error',
        isLoading: false,
        refetch: jest.fn(),
      });

      mockSelector.mockReturnValue({
        isLoading: false,
        error: null,
      });

      usePokemonDetail('1');
      expect(mockDispatch).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should handle data state', () => {
      const mockUseGetPokemonDetailQuery = require('../src/store/api/pokemonApi').useGetPokemonDetailQuery;
      mockUseGetPokemonDetailQuery.mockReturnValue({
        data: { id: 1, name: 'bulbasaur' },
        error: null,
        isLoading: false,
        refetch: jest.fn(),
      });

      mockSelector.mockReturnValue({
        isLoading: false,
        error: null,
      });

      usePokemonDetail('1');
      expect(mockDispatch).toHaveBeenCalledWith(expect.any(Object));
    });
  });
});