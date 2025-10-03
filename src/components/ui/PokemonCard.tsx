import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Pokemon } from '../../types';
import { capitalizeFirst, formatPokemonId, getPokemonImageUrl } from '../../utils/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
  onPress: (pokemon: Pokemon) => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onPress }) => {
  const pokemonId = formatPokemonId(parseInt(pokemon.url.split('/').slice(-2, -1)[0]));
  const imageUrl = getPokemonImageUrl(parseInt(pokemon.url.split('/').slice(-2, -1)[0]));

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(pokemon)}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.id}>{pokemonId}</Text>
        <Text style={styles.name}>{capitalizeFirst(pokemon.name)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 8,
  },
  content: {
    alignItems: 'center',
  },
  id: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
