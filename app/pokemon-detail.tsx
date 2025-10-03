import { useLocalSearchParams } from 'expo-router';
import PokemonDetailScreen from '../src/screens/pokemon/PokemonDetailScreen';

export default function PokemonDetail() {
  const { pokemonName } = useLocalSearchParams<{
    pokemonName: string;
  }>();

  return <PokemonDetailScreen pokemonName={pokemonName} />;
}