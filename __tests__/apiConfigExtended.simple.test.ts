describe('API Configuration Extended', () => {
  const originalEnv = process.env.EXPO_PUBLIC_POKEAPI_BASE_URL;

  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    if (originalEnv) {
      process.env.EXPO_PUBLIC_POKEAPI_BASE_URL = originalEnv;
    } else {
      delete process.env.EXPO_PUBLIC_POKEAPI_BASE_URL;
    }
  });

  it('should use default base URL when not configured', () => {
    delete process.env.EXPO_PUBLIC_POKEAPI_BASE_URL;
    const { API_CONFIG } = require('../src/constants/api');
    expect(API_CONFIG.BASE_URL).toBe('https://pokeapi.co/api/v2');
  });

  it('should use environment variable when configured', () => {
    process.env.EXPO_PUBLIC_POKEAPI_BASE_URL = 'https://custom-api.com/v2';
    const { API_CONFIG } = require('../src/constants/api');
    expect(API_CONFIG.BASE_URL).toBe('https://custom-api.com/v2');
  });

  it('should handle different environment variable values', () => {
    const testUrl = 'https://api.pokemon.com/v1';
    process.env.EXPO_PUBLIC_POKEAPI_BASE_URL = testUrl;
    const { API_CONFIG } = require('../src/constants/api');
    expect(API_CONFIG.BASE_URL).toBe(testUrl);
  });

  it('should have consistent API configuration structure', () => {
    const { API_CONFIG } = require('../src/constants/api');
    expect(API_CONFIG).toBeDefined();
    expect(typeof API_CONFIG).toBe('object');
    expect(API_CONFIG).toHaveProperty('BASE_URL');
    expect(typeof API_CONFIG.BASE_URL).toBe('string');
    expect(API_CONFIG.BASE_URL).toMatch(/^https?:\/\/.+/);
  });
});
