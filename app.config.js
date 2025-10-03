export default {
  expo: {
    name: "Pokemon Demo",
    slug: "pokemon-demo",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
      },
    },
    web: {
      favicon: "./assets/images/favicon.png",
    },
    extra: {
      pokeapiBaseUrl:
        process.env.EXPO_PUBLIC_POKEAPI_BASE_URL || "https://pokeapi.co/api/v2",
    },
  },
};
