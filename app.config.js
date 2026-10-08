const base = require("./app.json");

module.exports = ({ config }) => ({
  ...base.expo,
  ...config,
  plugins: ["expo-router", "expo-location"],
});
