module.exports = function (api) {
  const isWeb = api.caller(
    (caller) => caller && caller.name === "babel-loader"
  );
  api.cache.invalidate(() => isWeb);

  return {
    presets: [["babel-preset-expo"], "nativewind/babel"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./",
            "tailwind.config": "./tailwind.config.js",
          },
        },
      ],
      ...(isWeb ? [] : ["react-native-worklets/plugin"]),
    ],
  };
};
