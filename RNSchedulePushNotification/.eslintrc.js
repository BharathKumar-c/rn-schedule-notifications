module.exports = {
  root: true,
  extends: 'some-eslint-config',
  parser: '@babel/eslint-parser', // Assuming you're using the Babel ESLint parser
  parserOptions: {
    requireConfigFile: false, // Add this line to not require a Babel config file
    ecmaFeatures: {
      jsx: true,
    },
  },
  // ... other options
};

