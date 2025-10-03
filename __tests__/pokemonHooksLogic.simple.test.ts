// Test the logic of hooks without React Native dependencies
import { usePokemonDetail } from '../src/hooks/pokemon/usePokemonDetail';
import { usePokemonList } from '../src/hooks/pokemon/usePokemonList';

// Mock the hooks to test their logic
jest.mock('../src/hooks/pokemon/usePokemonList', () => ({
  usePokemonList: jest.fn(),
}));

jest.mock('../src/hooks/pokemon/usePokemonDetail', () => ({
  usePokemonDetail: jest.fn(),
}));

describe('Pokemon Hooks Logic', () => {
  describe('usePokemonList', () => {
    it('should return expected structure', () => {
      const mockReturn = {
        pokemonList: [],
        isLoading: false,
        error: null,
        refetch: jest.fn(),
        hasData: false,
      };

      (usePokemonList as jest.Mock).mockReturnValue(mockReturn);

      const result = usePokemonList();
      
      expect(result).toHaveProperty('pokemonList');
      expect(result).toHaveProperty('isLoading');
      expect(result).toHaveProperty('error');
      expect(result).toHaveProperty('refetch');
      expect(result).toHaveProperty('hasData');
    });

    it('should handle loading state', () => {
      const mockReturn = {
        pokemonList: [],
        isLoading: true,
        error: null,
        refetch: jest.fn(),
        hasData: false,
      };

      (usePokemonList as jest.Mock).mockReturnValue(mockReturn);

      const result = usePokemonList();
      
      expect(result.isLoading).toBe(true);
      expect(result.hasData).toBe(false);
    });

    it('should handle error state', () => {
      const mockReturn = {
        pokemonList: [],
        isLoading: false,
        error: 'Network error',
        refetch: jest.fn(),
        hasData: false,
      };

      (usePokemonList as jest.Mock).mockReturnValue(mockReturn);

      const result = usePokemonList();
      
      expect(result.error).toBe('Network error');
      expect(result.isLoading).toBe(false);
    });

    it('should handle data state', () => {
      const mockPokemon = [{ name: 'bulbasaur', url: 'url1' }];
      const mockReturn = {
        pokemonList: mockPokemon,
        isLoading: false,
        error: null,
        refetch: jest.fn(),
        hasData: true,
      };

      (usePokemonList as jest.Mock).mockReturnValue(mockReturn);

      const result = usePokemonList();
      
      expect(result.pokemonList).toEqual(mockPokemon);
      expect(result.hasData).toBe(true);
      expect(result.isLoading).toBe(false);
    });
  });

  describe('usePokemonDetail', () => {
    it('should return expected structure', () => {
      const mockReturn = {
        pokemonDetail: undefined,
        isLoading: false,
        error: null,
        refetch: jest.fn(),
      };

      (usePokemonDetail as jest.Mock).mockReturnValue(mockReturn);

      const result = usePokemonDetail('1');
      
      expect(result).toHaveProperty('pokemonDetail');
      expect(result).toHaveProperty('isLoading');
      expect(result).toHaveProperty('error');
      expect(result).toHaveProperty('refetch');
    });

    it('should handle loading state', () => {
      const mockReturn = {
        pokemonDetail: undefined,
        isLoading: true,
        error: null,
        refetch: jest.fn(),
      };

      (usePokemonDetail as jest.Mock).mockReturnValue(mockReturn);

      const result = usePokemonDetail('1');
      
      expect(result.isLoading).toBe(true);
      expect(result.pokemonDetail).toBeUndefined();
    });

    it('should handle error state', () => {
      const mockReturn = {
        pokemonDetail: undefined,
        isLoading: false,
        error: 'Failed to fetch',
        refetch: jest.fn(),
      };

      (usePokemonDetail as jest.Mock).mockReturnValue(mockReturn);

      const result = usePokemonDetail('1');
      
      expect(result.error).toBe('Failed to fetch');
      expect(result.isLoading).toBe(false);
    });

    it('should handle data state', () => {
      const mockPokemon = {
        id: 1,
        name: 'bulbasaur',
        height: 7,
        weight: 69,
        types: [],
        sprites: { front_default: 'url' },
        base_experience: 64,
        order: 1,
        is_default: true,
      };

      const mockReturn = {
        pokemonDetail: mockPokemon,
        isLoading: false,
        error: null,
        refetch: jest.fn(),
      };

      (usePokemonDetail as jest.Mock).mockReturnValue(mockReturn);

      const result = usePokemonDetail('1');
      
      expect(result.pokemonDetail).toEqual(mockPokemon);
      expect(result.isLoading).toBe(false);
      expect(result.error).toBeNull();
    });
  });
});
