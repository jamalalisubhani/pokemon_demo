import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ErrorMessage } from '../../components/ui/ErrorMessage';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { usePokemonDetail } from '../../hooks/pokemon';
import { capitalizeFirst, formatHeight, formatPokemonId, formatWeight } from '../../utils/pokemon';

interface PokemonDetailScreenProps {
  pokemonName?: string;
}

const PokemonDetailScreen: React.FC<PokemonDetailScreenProps> = ({ pokemonName }) => {
  const router = useRouter();
  const { pokemonId } = useLocalSearchParams<{
    pokemonId: string;
  }>();
  
  const { pokemonDetail, isLoading, error, refetch } = usePokemonDetail(pokemonId || '');

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <ErrorMessage message="Failed to load Pokemon details" onRetry={refetch} />
      </SafeAreaView>
    );
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingSpinner message="Loading Pokemon details..." />
      </SafeAreaView>
    );
  }

  if (!pokemonDetail) {
    return (
      <SafeAreaView style={styles.container}>
        <ErrorMessage message="Pokemon not found" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.customHeader}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {pokemonName ? capitalizeFirst(pokemonName) : 'Pokemon Details'}
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.pokemonHeader}>
          <Image
            source={{ uri: pokemonDetail.sprites.other['official-artwork'].front_default }}
            style={styles.image}
          />
          <Text style={styles.id}>{formatPokemonId(pokemonDetail.id)}</Text>
          <Text style={styles.name}>{capitalizeFirst(pokemonDetail.name)}</Text>
        </View>

        <View style={styles.details}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Info</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Height:</Text>
              <Text style={styles.value}>{formatHeight(pokemonDetail.height)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Weight:</Text>
              <Text style={styles.value}>{formatWeight(pokemonDetail.weight)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Base Experience:</Text>
              <Text style={styles.value}>{pokemonDetail.base_experience}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Types</Text>
            <View style={styles.typesContainer}>
              {pokemonDetail.types.map((type, index) => (
                <View key={index} style={styles.typeBadge}>
                  <Text style={styles.typeText}>{capitalizeFirst(type.type.name)}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    paddingTop: 8,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    minWidth: 40,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  pokemonHeader: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'white',
    marginBottom: 12,
    borderRadius: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 16,
  },
  id: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  details: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  section: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 12,
    borderRadius: 12,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typeBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  typeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export default PokemonDetailScreen;