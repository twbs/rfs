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
