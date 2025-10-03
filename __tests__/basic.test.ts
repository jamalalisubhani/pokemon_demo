// Basic test to verify Jest is working
describe('Basic functionality', () => {
  it('should pass a simple test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should handle string operations', () => {
    const pokemonName = 'pikachu';
    expect(pokemonName.toUpperCase()).toBe('PIKACHU');
  });

  it('should handle array operations', () => {
    const pokemonList = ['bulbasaur', 'ivysaur', 'venusaur'];
    expect(pokemonList.length).toBe(3);
    expect(pokemonList.includes('ivysaur')).toBe(true);
  });
});
