/* eslint-env mocha */

'use strict';

const assert = require('assert');
const result = require('./lib/result.js');
const tests = require('./tests.json');

const styles = [
  'Less',
  'LibSass',
  'DartSass',
  'Stylus',
  'Postcss'
];

function doTest(style) {
  describe(style, () => {
    tests.forEach(test => {
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
    });
  });
}

styles.forEach(style => {
  doTest(style);
});
