/* eslint-env mocha */

'use strict';

const assert = require('assert').strict;
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
    for (const { id, name } of tests) {
      it(name, done => {
        const generated = result[style.toLowerCase()](id);
        const expected = result.expected(id);

        if (generated instanceof Promise) {
          generated.then(generated => {
            assert.equal(generated, expected);
            done();
          }).catch(error => {
            done(error);
          });
        } else {
          assert.equal(generated, expected);
          done();
        }
      });
    }
  });
}

for (const style of styles) {
  doTest(style);
}
