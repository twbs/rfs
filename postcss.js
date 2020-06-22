/*!
 * PostCSS RFS plugin
 *
 * Automated responsive values for font sizes, paddings, margins and much more
 *
 * Licensed under MIT (https://github.com/twbs/rfs/blob/main/LICENSE)
 */

'use strict';

const postcss = require('postcss');
const RfsClass = require('./lib/rfs.js');

const DISABLE_RFS_SELECTOR = '.disable-rfs';
const ENABLE_RFS_SELECTOR = '.enable-rfs';

module.exports = postcss.plugin('postcss-rfs', opts => {
  const rfs = new RfsClass(opts);

  // Get the options merged with defaults
  opts = rfs.getOptions();
  const mediaQuery = rfs.renderMediaQuery();

  return css => {
    css.walkRules(rule => {
      const mediaQueryRules = [];
      const extraBlocks = [];
      const {parent} = rule;
      let removeRule = false;
      let dcRule;
      let ecRule;
      let ruleSelector = rule.selector;

      // Prepare rule to add to media query
      if (opts.class === 'enable') {
        const selectors = rule.selector.split(',');
        let tempRuleSelector = '';

        for (const selector of selectors) {
          tempRuleSelector += `${ENABLE_RFS_SELECTOR} ${selector},\n`;
          tempRuleSelector += `${selector + ENABLE_RFS_SELECTOR},\n`;
        }

        ruleSelector = tempRuleSelector.slice(0, -2);
      }

      const fluidRule = postcss.rule({
        selector: ruleSelector
      });

      // Disable classes
      if (opts.class === 'disable') {
        const selectors = rule.selector.split(',');
        let ruleSelector = '';

        for (const selector of selectors) {
          ruleSelector += (opts.mode === 'max-media-query') ? `${selector},\n` : '';
          ruleSelector += `${DISABLE_RFS_SELECTOR} ${selector},\n`;
          ruleSelector += `${selector + DISABLE_RFS_SELECTOR},\n`;
        }

        ruleSelector = ruleSelector.slice(0, -2);

        dcRule = postcss.rule({
          selector: ruleSelector,
          source: rule.source
        });
      }

      rule.walkDecls(decl => {
        // Check if the selector doesn't contain the disabled selector
        // Check if value contains rfs() function
        if (!rule.selector.includes(DISABLE_RFS_SELECTOR) && new RegExp(opts.functionName + '(.*)', 'g').test(decl.value)) {
          const value = rfs.value(decl.value);
          const fluidValue = rfs.fluidValue(decl.value);
          decl.value = value;

          if (value !== fluidValue) {
            const defaultValue = (opts.mode === 'min-media-query') ? ((opts.class === 'enable') ? value : fluidValue) : value;
            const mediaQueryValue = (opts.mode === 'min-media-query') ? value : fluidValue;
            decl.value = defaultValue;

            fluidRule.append(decl.clone({value: mediaQueryValue}));
            mediaQueryRules.push(fluidRule);

            // Disable classes
            if (opts.class === 'disable') {
              const declOpts = (opts.mode === 'max-media-query') ? {} : {value};
              dcRule.append(decl.clone(declOpts));
              extraBlocks.push(dcRule);
            } else if (opts.class === 'enable' && opts.mode === 'min-media-query') {
              if (ecRule === undefined) {
                ecRule = postcss.rule({
                  selector: ruleSelector,
                  source: parent.source
                });
              }

              ecRule.append(decl.clone({value: fluidValue}));
              extraBlocks.push(ecRule);
            }

            // Remove declaration if needed
            if (opts.class === 'disable' && opts.mode === 'max-media-query') {
              if (decl.prev() || decl.next()) {
                decl.remove();
              } else {
                removeRule = true;
              }
            }
          }
        }
      });

      if (mediaQueryRules.length !== 0) {
        // Safari iframe resize bug: https://github.com/twbs/rfs/issues/14
        if (opts.safariIframeResizeBugFix) {
          rule.append({
            prop: 'min-width',
            value: '0vw'
          });
        }

        const fluidMediaQuery = mediaQuery.clone();

        mediaQueryRules.forEach(mediaQueryRule => {
          fluidMediaQuery.append(mediaQueryRule);
        });

        parent.insertAfter(rule, fluidMediaQuery);

        if (extraBlocks.length > 0) {
          extraBlocks.forEach(disableBlock => {
            parent.insertAfter(rule, disableBlock);
          });
        }

        if (removeRule) {
          rule.remove();
        }
      }
    });
  };
});
