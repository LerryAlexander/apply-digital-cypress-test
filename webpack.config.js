const path = require('path');

module.exports = {
  resolve: {
    alias: {
      'page-objects': path.resolve('./cypress/page-objects'),
      'fixtures': path.resolve('./cypress/fixtures')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
};
