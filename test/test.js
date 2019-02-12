/* eslint-env mocha */

'use strict';

const assert = require('assert');
const tests = require('./lib/tests.js');

const styles = ['Less', 'Sass', 'Stylus', 'PostCSS'];
const result = require('./lib/result.js');

styles.forEach(style => {
  describe(style, () => {
    tests.forEach(test => {
      it(test.name, done => {
        const generated = result[style.toLowerCase()](test.id);
        const expected = result.expected(test.id);

        // If promise:
        if (typeof generated.then === 'function') {
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
});
