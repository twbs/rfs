const assert = require('assert');
const tests = require("./lib/tests.js");
const styles = ['Less', 'Sass', 'Stylus', 'PostCSS'];
const result = require("./lib/result.js");

styles.forEach((style) => {
  describe(style, function () {
    tests.forEach((test) => {
      it(test.name, function (done) {
        const generated = result[style.toLowerCase()](test.id);
        const expected = result.expected(test.id);
        // If promise:
        if (typeof generated.then === 'function') {
          generated.then((generated) => {
            assert.equal(generated, expected);
            done();
          }).catch((error) => {
            done(error);
          });
        }
        else {
          assert.equal(generated, expected);
          done();
        }
      });
    });
  });
});

