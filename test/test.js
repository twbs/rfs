'use strict';

const { suite } = require('uvu');
const assert = require('uvu/assert');
const result = require('./lib/result.js');
const tests = require('./tests.json');

const styles = [
  'Less',
  'Less3',
  'LibSass',
  'DartSass',
  'Stylus',
  'Postcss'
];

function doTest(style) {
  const testSuite = suite(style);

  for (const { id, name } of tests) {
    testSuite(name, () => {
      const generated = result[style.toLowerCase()](id);
      const expected = result.expected(id);

      if (generated instanceof Promise) {
        generated.then(generated => {
          assert.is(generated, expected);
        });
      } else {
        assert.is(generated, expected);
      }
    });
  }

  testSuite.run();
}

for (const style of styles) {
  doTest(style);
}

// Regression suite: ensure the SCSS sources do not emit any
// "mixed-decls" deprecation warnings under Dart Sass >= 1.77.7.
// See https://github.com/twbs/rfs/issues/474.
// eslint-disable-next-line import/no-unassigned-import
require('./sass-no-deprecation-warnings.js');
