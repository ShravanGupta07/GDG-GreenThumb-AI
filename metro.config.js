// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add this to resolve date-fns issues
config.resolver.extraNodeModules = {
  'date-fns': path.resolve(__dirname, 'node_modules/date-fns'),
};

// Ensure .cjs is included in source extensions
config.resolver.sourceExts.push('cjs');

// Add SVG transformer configuration
config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== "svg");
config.resolver.sourceExts.push("svg");

module.exports = config;