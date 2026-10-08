const base = require("./app.json");

module.exports = ({ config }) => ({
  ...base.expo,
  ...config,
  plugins: ["expo-router", "expo-location"],
  android: {
    ...base.expo.android,
    ...config.android,
    config: {
      ...base.expo.android?.config,
      ...config.android?.config,
      googleMaps: {
        ...(base.expo.android?.config?.googleMaps || {}),
        ...(config.android?.config?.googleMaps || {}),
        apiKey: process.env.GOOGLE_MAPS_API_KEY || undefined,
      },
    },
  },
  ios: {
    ...base.expo.ios,
    ...config.ios,
    config: {
      ...base.expo.ios?.config,
      ...config.ios?.config,
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || undefined,
    },
  },
});
