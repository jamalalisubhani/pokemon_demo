import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ErrorMessage } from '../../components/ui/ErrorMessage';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { PokemonCard } from '../../components/ui/PokemonCard';
import { usePokemonList } from '../../hooks/pokemon';
import { Pokemon } from '../../types';

const PokemonListScreen: React.FC = () => {
  const router = useRouter();
  const [offset, setOffset] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  
  const { pokemonList, isLoading, error, refetch, hasData } = usePokemonList(offset);

  const handleRefresh = async () => {
    setRefreshing(true);
    setOffset(0);
    try {
      await refetch();
    } catch (err) {
      console.error('Failed to refresh Pokemon list:', err);
    } finally {
      setRefreshing(false);
    }
  };

  const handleLoadMore = () => {
    if (!isLoading && hasData) {
      setOffset(prev => prev + 20);
    }
  };

  const handlePokemonPress = (pokemon: Pokemon) => {
    const pokemonId = pokemon.url.split('/').slice(-2, -1)[0];
    router.push(`/pokemon-detail?pokemonId=${pokemonId}&pokemonName=${pokemon.name}`);
  };

  const renderPokemonItem = ({ item }: { item: Pokemon }) => (
    <PokemonCard pokemon={item} onPress={handlePokemonPress} />
  );

  const renderFooter = () => {
    if (!isLoading) return null;
    return <LoadingSpinner message="Loading more Pokemon..." size="small" />;
  };

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <ErrorMessage message="Failed to load Pokemon list" onRetry={handleRefresh} />
      </SafeAreaView>
    );
  }

  if (isLoading && !hasData) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingSpinner message="Loading Pokemon..." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={pokemonList}
        renderItem={renderPokemonItem}
        keyExtractor={(item) => item.name}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
});

export default PokemonListScreen;