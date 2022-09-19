module.exports = {
  extends: ['react-app', 'react-app/jest', 'prettier'],
  ignorePatterns: ['.*', '**/*.md', '**/*.html', '**/*.json'],
  rules: {
    'react-hooks/exhaustive-deps': 0,
  },
}
