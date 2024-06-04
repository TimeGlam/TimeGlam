module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "airbnb-base",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-console": "off",
    "import/first": "off",
    "underscore-dangle": "off",
    "no-restricted-syntax": "off",
    "no-await-in-loop": "off",
    "no-underscore-dangle": "off",
    "implicit-arrow-linebreak": "off",
    "no-loop-func": "off",
    "prefer-const": "off",
    "arrow-body-style": "off",
    "object-shorthand": "off",
    "no-plusplus": "off",
    "function-paren-newline": "off",
    quotes: "off",
    "comma-dangle": "off",
    radix: "off",
  },
};
