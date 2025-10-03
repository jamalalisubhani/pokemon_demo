# Pokemon Demo App

A React Native application built with Expo Router, Redux Toolkit, and RTK Query that retrieves and displays Pokemon data from the PokeAPI with persistent storage.

## 🏗️ Project Structure

```
pokemon-demo/
├── app/                          # Expo Router pages
│   ├── (tabs)/                   # Tab navigation
│   │   ├── _layout.tsx          # Tab layout configuration
│   │   └── index.tsx            # Pokemon list screen
│   ├── _layout.tsx              # Root layout with Redux provider
│   └── pokemon-detail.tsx       # Pokemon detail screen
├── src/                          # Source code
│   ├── components/               # Reusable UI components
│   │   ├── ui/                  # Basic UI components
│   │   │   ├── PokemonCard.tsx  # Pokemon card component
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── ErrorMessage.tsx
│   │   ├── forms/               # Form components
│   │   └── common/              # Common components
│   ├── screens/                 # Screen components
│   │   └── pokemon/             # Pokemon-related screens
│   │       ├── PokemonListScreen.tsx
│   │       └── PokemonDetailScreen.tsx
│   ├── store/                   # Redux store
│   │   ├── api/                 # RTK Query API slices
│   │   │   └── pokemonApi.ts
│   │   ├── slices/              # Redux slices
│   │   │   └── pokemonSlice.ts
│   │   ├── selectors/           # Redux selectors
│   │   │   └── pokemonSelectors.ts
│   │   └── index.ts             # Store configuration
│   ├── hooks/                   # Custom hooks
│   │   ├── pokemon/             # Pokemon-specific hooks
│   │   │   ├── usePokemonList.ts
│   │   │   └── usePokemonDetail.ts
│   │   └── common/              # Common hooks
│   │       ├── useAppSelector.ts
│   │       └── useAppDispatch.ts
│   ├── services/                # External services
│   │   ├── api/                 # API service configuration
│   │   │   └── index.ts
│   │   └── storage/             # Storage service
│   │       └── index.ts
│   ├── utils/                   # Utility functions
│   │   ├── pokemon/             # Pokemon utilities
│   │   │   └── index.ts
│   │   ├── validation/          # Validation utilities
│   │   │   └── index.ts
│   │   ├── formatting/          # Formatting utilities
│   │   │   └── index.ts
│   │   └── index.ts             # Utility exports
│   ├── constants/               # App constants
│   │   ├── api/                 # API constants
│   │   │   └── index.ts
│   │   ├── config/              # App configuration
│   │   │   └── index.ts
│   │   └── theme/               # Theme constants
│   │       └── index.ts
│   ├── types/                   # TypeScript type definitions
│   │   ├── pokemon.ts           # Pokemon types
│   │   └── index.ts             # Type exports
│   └── ReduxProvider.tsx        # Redux provider component
├── __tests__/                   # Test files
│   ├── unit/                    # Unit tests
│   │   ├── components/          # Component tests
│   │   ├── screens/             # Screen tests
│   │   ├── store/               # Store tests
│   │   ├── utils/               # Utility tests
│   │   └── hooks/               # Hook tests
│   ├── integration/             # Integration tests
│   │   └── pokemon/             # Pokemon integration tests
│   └── e2e/                     # End-to-end tests
│       └── pokemon/             # Pokemon E2E tests
├── assets/                      # Static assets
├── coverage/                    # Test coverage reports
└── docs/                        # Documentation
```

## 🚀 Features

- **Pokemon List**: Displays a paginated list of Pokemon with images
- **Pokemon Details**: Shows detailed information for each Pokemon
- **Persistent Storage**: Caches Pokemon data using AsyncStorage
- **Redux State Management**: Uses Redux Toolkit with RTK Query
- **TypeScript**: Full type safety throughout the application
- **Testing**: Comprehensive test suite with 60%+ coverage
- **Configurable API**: Environment variable support for API URLs

## 🛠️ Tech Stack

- **React Native** with Expo Router
- **Redux Toolkit** for state management
- **RTK Query** for API calls and caching
- **TypeScript** for type safety
- **AsyncStorage** for persistent storage
- **Jest** for testing
- **React Native Testing Library** for component testing

## 📦 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd pokemon-demo
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run specific test configuration
npm run test:final:coverage
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_POKEAPI_BASE_URL=https://pokeapi.co/api/v2
```

### API Configuration

The app uses the PokeAPI by default but can be configured to use any compatible API:

```typescript
// src/constants/api/index.ts
export const API_CONFIG = {
  BASE_URL:
    process.env.EXPO_PUBLIC_POKEAPI_BASE_URL || "https://pokeapi.co/api/v2",
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  CACHE_TIME: 5 * 60 * 1000, // 5 minutes
} as const;
```

## 📱 Usage

### Running the App

1. **Development Mode**:

```bash
npm start
```

2. **iOS Simulator**:

```bash
npm run ios
```

3. **Android Emulator**:

```bash
npm run android
```

4. **Web Browser**:

```bash
npm run web
```

### Custom API URL

```bash
EXPO_PUBLIC_POKEAPI_BASE_URL=https://your-api.com/api/v2 npm start
```

## 🏗️ Architecture

### State Management

The app uses Redux Toolkit with the following structure:

- **Store**: Centralized state management
- **Slices**: Feature-based state slices
- **Selectors**: Memoized state selectors
- **RTK Query**: API state management and caching

### Component Architecture

- **Screens**: Top-level screen components
- **Components**: Reusable UI components
- **Hooks**: Custom hooks for business logic
- **Services**: External service integrations

### Data Flow

1. **API Calls**: RTK Query handles API requests
2. **State Updates**: Redux slices manage local state
3. **Persistence**: AsyncStorage for data caching
4. **UI Updates**: React components re-render on state changes

## 🧪 Testing Strategy

### Test Types

1. **Unit Tests**: Individual function and component testing
2. **Integration Tests**: Feature workflow testing
3. **E2E Tests**: Complete user journey testing

### Coverage Requirements

- **Statements**: 60%+
- **Branches**: 60%+
- **Functions**: 60%+
- **Lines**: 60%+

### Test Structure

```
__tests__/
├── unit/                    # Unit tests
│   ├── components/          # Component unit tests
│   ├── screens/             # Screen unit tests
│   ├── store/               # Store unit tests
│   ├── utils/               # Utility unit tests
│   └── hooks/               # Hook unit tests
├── integration/             # Integration tests
│   └── pokemon/             # Pokemon feature tests
└── e2e/                     # End-to-end tests
    └── pokemon/             # Pokemon E2E tests
```

## 📚 Code Quality

### Principles Applied

- **Code Separation**: Clear separation of concerns
- **Clean Code**: Readable and maintainable code
- **Readability**: Comprehensive comments and naming
- **Maintainability**: Modular and extensible architecture

### Best Practices

- TypeScript for type safety
- Custom hooks for business logic
- Service layer for external integrations
- Comprehensive error handling
- Consistent naming conventions
- Modular component structure

## 🚀 Deployment

### Building for Production

1. **iOS**:

```bash
expo build:ios
```

2. **Android**:

```bash
expo build:android
```

3. **Web**:

```bash
expo build:web
```

### Environment Configuration

Ensure all environment variables are properly configured for production:

```bash
EXPO_PUBLIC_POKEAPI_BASE_URL=https://pokeapi.co/api/v2
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `expo start --clear`
2. **iOS simulator issues**: Reset simulator and restart
3. **Android emulator issues**: Restart emulator and clear cache
4. **Test failures**: Check Jest configuration and dependencies

### Getting Help

- Check the [Expo documentation](https://docs.expo.dev/)
- Review the [React Native documentation](https://reactnative.dev/)
- Check the [Redux Toolkit documentation](https://redux-toolkit.js.org/)

## 📈 Performance

### Optimization Strategies

- RTK Query caching for API calls
- AsyncStorage for data persistence
- Memoized selectors for state access
- Lazy loading for large lists
- Image optimization for Pokemon sprites

### Monitoring

- Use React Native Performance Monitor
- Monitor Redux DevTools for state changes
- Track API call performance
- Monitor memory usage
