/*!
 * PostCSS RFS plugin 10.0.0-alpha.0
 *
 * Automated responsive values for font sizes, paddings, margins and much more
 *
 * Licensed under MIT (https://github.com/twbs/rfs/blob/master/LICENSE)
 */

'use strict';

const postcss = require('postcss');
const RfsClass = require('./lib/rfs.js');

module.exports = postcss.plugin('postcss-rfs', opts => {
  const rfs = new RfsClass(opts);

  // Get the options merged with defaults
  opts = rfs.getOptions();

  return css => {
    css.walkDecls(decl => {
      // Check if the selector doesn't contain the disabled selector
      // Check if value contains rfs() function
      if (new RegExp(opts.functionName + '(.*)', 'g').test(decl.value)) {
        decl.value = rfs.value(decl.value);
      }
    });
  };
});
