// Validation utility functions
export const isValidPokemonData = (data: any): boolean => {
  return data && 
         typeof data.name === 'string' && 
         typeof data.url === 'string' &&
         data.name.length > 0 &&
         data.url.includes('pokemon');
};

export const isValidPokemonDetail = (data: any): boolean => {
  return data &&
         typeof data.id === 'number' &&
         typeof data.name === 'string' &&
         typeof data.height === 'number' &&
         typeof data.weight === 'number' &&
         Array.isArray(data.types) &&
         data.sprites &&
         typeof data.sprites === 'object';
};

export const validatePokemonList = (data: any): boolean => {
  return data &&
         typeof data.count === 'number' &&
         Array.isArray(data.results) &&
         data.results.every((pokemon: any) => isValidPokemonData(pokemon));
};

export const isValidPokemonUrl = (url: string): boolean => 
  url.includes('pokeapi.co/api/v2/pokemon/') && url.endsWith('/');

export const validatePokemonId = (id: string): boolean => {
  const numId = parseInt(id, 10);
  return !isNaN(numId) && numId > 0 && numId.toString() === id;
};

export const validatePokemonName = (name: string): boolean => {
  return typeof name === 'string' && 
         name.length > 0 && 
         /^[a-z]+$/.test(name);
};
