module.exports = {
  "extends": ["airbnb", "airbnb/hooks"],
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "globals": {
    "document": true,
    "foo": true,
    "window": true
  },
  "rules": {
    "import/no-extraneous-dependencies": [0],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  }
};