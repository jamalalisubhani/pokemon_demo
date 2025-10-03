import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  POKEMON_CACHE: 'pokemon_cache',
  FAVORITES: 'favorite_pokemon',
  SETTINGS: 'app_settings',
} as const;

export class StorageService {
  static async getItem<T>(key: string): Promise<T | null> {
    try {
      const item = await AsyncStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting item from storage: ${key}`, error);
      return null;
    }
  }

  static async setItem<T>(key: string, value: T): Promise<boolean> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting item in storage: ${key}`, error);
      return false;
    }
  }

  static async removeItem(key: string): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing item from storage: ${key}`, error);
      return false;
    }
  }

  static async clear(): Promise<boolean> {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing storage', error);
      return false;
    }
  }

  // Pokemon-specific storage methods
  static async getPokemonCache() {
    return this.getItem(STORAGE_KEYS.POKEMON_CACHE);
  }

  static async setPokemonCache(data: any) {
    return this.setItem(STORAGE_KEYS.POKEMON_CACHE, data);
  }

  static async getFavorites() {
    return this.getItem(STORAGE_KEYS.FAVORITES);
  }

  static async setFavorites(data: any) {
    return this.setItem(STORAGE_KEYS.FAVORITES, data);
  }

  static async clearPokemonCache() {
    return this.removeItem(STORAGE_KEYS.POKEMON_CACHE);
  }
}
