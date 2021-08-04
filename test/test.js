/* eslint-env mocha */

'use strict';

const assert = require('assert');
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
  describe(style, () => {
    for (const test of tests) {
      it(test.name, done => {
        const generated = result[style.toLowerCase()](test.id);
        const expected = result.expected(test.id);

        if (generated instanceof Promise) {
          generated.then(generated => {
            assert.strictEqual(generated, expected);
            done();
          }).catch(error => {
            done(error);
          });
        } else {
          assert.strictEqual(generated, expected);
          done();
        }
      });
    }
  });
}

for (const style of styles) {
  doTest(style);
}
