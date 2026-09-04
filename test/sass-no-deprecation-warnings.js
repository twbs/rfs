'use strict';

// Regression test for https://github.com/twbs/rfs/issues/474
//
// Since Dart Sass 1.77.7, the SCSS engine emits a "mixed-decls" deprecation
// warning whenever a property declaration is followed by a nested rule
// inside the same parent. The internal rfs mixins `_rfs-rule` and
// `_rfs-media-query-rule` triggered 18+ such warnings per compilation of the
// enable-class + min-media-query path. This test renders every test fixture
// through Dart Sass and fails if any "mixed-decls" deprecation is reported.

const path = require('path');
const { suite } = require('uvu');
const assert = require('uvu/assert');
const dartSass = require('sass');

const tests = require('./tests.json');

function compileWithWarnings(id) {
  const warnings = [];

  dartSass.renderSync({
    file: path.join(__dirname, `sass/${id}.scss`),
    logger: {
      warn(message) {
        warnings.push(message);
      }
    }
  });

  return warnings;
}

const noDeprecationSuite = suite('Sass: no mixed-decls deprecation warnings');

for (const { id, name } of tests) {
  noDeprecationSuite(`${name} (${id})`, () => {
    const warnings = compileWithWarnings(id);
    const mixedDecls = warnings.filter(message => message.includes('mixed-decls'));

    assert.is(
      mixedDecls.length,
      0,
      `Expected no "mixed-decls" deprecation warnings for ${id}, but got ${mixedDecls.length}:\n${mixedDecls.slice(0, 3).join('\n---\n')}`
    );
  });
}

noDeprecationSuite.run();
