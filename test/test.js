/* eslint-env mocha */

'use strict';

const assert = require('assert');
const result = require('./lib/result.js');
const tests = [
  'Default build',
  'Disable responsive font size',
  'Change breakpoint unit to em',
  'Change base font size',
  'Change font size unit',
  'Enable two dimensional',
  'Go loco with the config',
  'Include function multiple times'
];
const styles = [
  'Less',
  'LibSass',
  'DartSass',
  'Stylus',
  'Postcss'
];

function doTest(style) {
  describe(style, () => {
    tests.forEach((test, index) => {
      const name = `test-${index + 1}`;
      it(test, done => {
        const generated = result[style.toLowerCase()](name);
        const expected = result.expected(name);

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
