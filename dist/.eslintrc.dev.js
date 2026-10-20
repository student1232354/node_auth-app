"use strict";

module.exports = {
  "extends": '@mate-academy/eslint-config',
  ignorePatterns: ['src/client/src/**'],
  env: {
    jest: true
  },
  rules: {
    'no-proto': 0
  },
  plugins: ['jest']
};