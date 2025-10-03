// Pokemon utility functions
export const formatHeight = (height: number): string => `${height * 10} cm`;
export const formatWeight = (weight: number): string => `${weight / 10} kg`;
export const formatPokemonId = (id: number): string => `#${id.toString().padStart(3, '0')}`;
export const extractPokemonId = (url: string): string => {
  const parts = url.split('/');
  const lastPart = parts[parts.length - 1];
  const secondLastPart = parts[parts.length - 2];
  
  // If last part is empty (trailing slash), use second last part
  if (lastPart === '') {
    return secondLastPart || url;
  }
  
  // If last part is not empty, use it
  return lastPart || url;
};
export const capitalizeFirst = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);
export const getPokemonImageUrl = (id: number): string => 
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
export const isValidPokemonUrl = (url: string): boolean => 
  url.includes('pokeapi.co/api/v2/pokemon/') && url.endsWith('/');
export const getPokemonNameFromUrl = (url: string): string => {
  const parts = url.split('/');
  const lastPart = parts[parts.length - 1];
  const secondLastPart = parts[parts.length - 2];
  
  // If last part is empty (trailing slash), use second last part
  if (lastPart === '') {
    return secondLastPart || url;
  }
  
  // If last part is not empty, use it
  return lastPart || url;
};
