module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-paper/babel",
      "@babel/plugin-transform-export-namespace-from",
      // NOTE: this is only necessary if you are using reanimated for animations
      "react-native-reanimated/plugin",
      "expo-router/babel",
      [
        "babel-plugin-module-resolver",
        {
          alias: {
            tabs: "./app/(tabs)",
            components: "./components",
            types: "./types",
            utils: "./utils",
            api: "./api",
          },
        },
      ],
    ],
  };
};
