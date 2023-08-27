module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['chore', 'feat', 'improvement', 'fix', 'draft', 'wip'],
    ],
  },
};
