const common = {
  requireModule: ['ts-node/register'],
  require: ['src/step-definitions/**/*.ts'],
  format: [
    'progress',
    '@cucumber/pretty-formatter',
    ['html', 'test-results/cucumber-report.html'],
    ['json', 'test-results/cucumber-report.json']
  ],
  formatOptions: { snippetInterface: 'async-await' },
  publishQuiet: true
};

module.exports = {
  default: {
    ...common,
    paths: ['src/features/**/*.feature'],
    tags: 'not @wip'
  },
  smoke: {
    ...common,
    paths: ['src/features/**/*.feature'],
    tags: '@smoke and not @wip'
  },
  regression: {
    ...common,
    paths: ['src/features/**/*.feature'],
    tags: '@regression and not @wip'
  }
};
