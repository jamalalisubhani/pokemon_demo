import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { PokemonCard } from '../src/components/ui/PokemonCard';
import { Pokemon } from '../src/types';

// Mock the utility functions
jest.mock('../src/utils/pokemon', () => ({
  capitalizeFirst: jest.fn((str: string) => str.charAt(0).toUpperCase() + str.slice(1)),
  formatPokemonId: jest.fn((id: number) => `#${id.toString().padStart(3, '0')}`),
  getPokemonImageUrl: jest.fn((id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`),
}));

describe('PokemonCard', () => {
  const mockPokemon: Pokemon = {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
  };

  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render Pokemon card correctly', () => {
    const { getByText, getByTestId } = render(
      <PokemonCard pokemon={mockPokemon} onPress={mockOnPress} />
    );

    expect(getByText('#001')).toBeTruthy();
    expect(getByText('Bulbasaur')).toBeTruthy();
    expect(getByTestId('pokemon-image')).toBeTruthy();
  });

  it('should call onPress when card is pressed', () => {
    const { getByTestId } = render(
      <PokemonCard pokemon={mockPokemon} onPress={mockOnPress} />
    );

    const card = getByTestId('pokemon-card');
    fireEvent.press(card);

    expect(mockOnPress).toHaveBeenCalledWith(mockPokemon);
  });

  it('should extract Pokemon ID correctly from URL', () => {
    const { getByText } = render(
      <PokemonCard pokemon={mockPokemon} onPress={mockOnPress} />
    );

    expect(getByText('#001')).toBeTruthy();
  });

  it('should handle different Pokemon', () => {
    const charmander: Pokemon = {
      name: 'charmander',
      url: 'https://pokeapi.co/api/v2/pokemon/4/',
    };

    const { getByText } = render(
      <PokemonCard pokemon={charmander} onPress={mockOnPress} />
    );

    expect(getByText('#004')).toBeTruthy();
    expect(getByText('Charmander')).toBeTruthy();
  });

  it('should handle Pokemon with different URL formats', () => {
    const pikachu: Pokemon = {
      name: 'pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/25',
    };

    const { getByText } = render(
      <PokemonCard pokemon={pikachu} onPress={mockOnPress} />
    );

    expect(getByText('#025')).toBeTruthy();
    expect(getByText('Pikachu')).toBeTruthy();
  });

  it('should render image with correct URL', () => {
    const { getByTestId } = render(
      <PokemonCard pokemon={mockPokemon} onPress={mockOnPress} />
    );

    const image = getByTestId('pokemon-image');
    expect(image.props.source.uri).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png');
  });

  it('should handle Pokemon with special characters in name', () => {
    const nidoran: Pokemon = {
      name: 'nidoran-m',
      url: 'https://pokeapi.co/api/v2/pokemon/32/',
    };

    const { getByText } = render(
      <PokemonCard pokemon={nidoran} onPress={mockOnPress} />
    );

    expect(getByText('Nidoran-m')).toBeTruthy();
  });

  it('should handle Pokemon with numbers in name', () => {
    const porygon2: Pokemon = {
      name: 'porygon2',
      url: 'https://pokeapi.co/api/v2/pokemon/233/',
    };

    const { getByText } = render(
      <PokemonCard pokemon={porygon2} onPress={mockOnPress} />
    );

    expect(getByText('Porygon2')).toBeTruthy();
  });
});
