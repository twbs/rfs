'use strict';

const postcss = require('postcss');
const valueParser = require('postcss-value-parser');

const defaultOptions = {
  baseValue: 20,
  unit: 'rem',
  breakpoint: 1200,
  breakpointUnit: 'px',
  factor: 10,
  twoDimensional: false,
  unitPrecision: 5,
  remValue: 16,
  functionName: 'rfs',
  enableRfs: true,
  mode: 'min-media-query'
};

module.exports = class {
  constructor(opts) {
    this.opts = { ...defaultOptions, ...opts };

    if (typeof this.opts.baseValue !== 'number') {
      if (this.opts.baseValue.endsWith('px')) {
        this.opts.baseValue = Number.parseFloat(this.opts.baseValue);
      } else if (this.opts.baseValue.endsWith('rem')) {
        this.opts.baseValue = Number.parseFloat(this.opts.baseValue) * this.opts.remValue;
      } else {
        throw new TypeError('`baseValue` option is invalid, it should be set in `px` or `rem`.');
      }
    }

    if (typeof this.opts.breakpoint !== 'number') {
      if (this.opts.breakpoint.endsWith('px')) {
        this.opts.breakpoint = Number.parseFloat(this.opts.breakpoint);
      } else if (this.opts.breakpoint.endsWith('em')) {
        this.opts.breakpoint = Number.parseFloat(this.opts.breakpoint) * this.opts.remValue;
      } else {
        throw new TypeError('`breakpoint` option is invalid, it should be set in `px`, `rem` or `em`.');
      }
    }

    if (!['px', 'rem', 'em'].includes(this.opts.breakpointUnit)) {
      throw new TypeError('`breakpointUnit` option is invalid, it should be `px`, `rem` or `em`.');
    }
  }

  toFixed(number, precision) {
    const multiplier = 10 ** (precision + 1);
    const wholeNumber = Math.floor(number * multiplier);

    return Math.round(wholeNumber / 10) * 10 / multiplier;
  }

  renderValue(value) {
    // Do not add unit if value is 0
    if (value === 0) {
      return value;
    }

    // Render value in desired unit
    return this.opts.unit === 'rem' ?
      `${this.toFixed(value / this.opts.remValue, this.opts.unitPrecision)}rem` :
      `${this.toFixed(value, this.opts.unitPrecision)}px`;
  }

  process(declarationValue, fluid) {
    const parsed = valueParser(declarationValue);

    // Function walk() will visit all the of the nodes in the tree,
    // invoking the callback for each.
    parsed.walk(node => {
      // Since we only want to transform rfs() values,
      // we can ignore everything else.
      if (node.type !== 'function' && node.value !== this.opts.functionName) {
        return;
      }

      const wordNodes = node.nodes.filter(node => node.type === 'word');

      for (const node of wordNodes) {
        node.value = node.value.replace(/^(-?\d*\.?\d+)(.*)/g, (match, value, unit) => {
          value = Number.parseFloat(value);

          // Return value if it's not a number or px/rem value
          if (Number.isNaN(value) || !['px', 'rem'].includes(unit)) {
            return match;
          }

          // Convert to px if in rem
          if (unit === 'rem') {
            value *= this.opts.remValue;
          }

          // Only add responsive function if needed
          if (!fluid || this.opts.baseValue >= Math.abs(value) || this.opts.factor <= 1 || !this.opts.enableRfs) {
            return this.renderValue(value);
          }

          // Calculate base and difference
          let baseValue = this.opts.baseValue + ((Math.abs(value) - this.opts.baseValue) / this.opts.factor);
          const diff = Math.abs(value) - baseValue;

          // Divide by remValue if needed
          if (this.opts.unit === 'rem') {
            baseValue /= this.opts.remValue;
          }

          const viewportUnit = this.opts.twoDimensional ? 'vmin' : 'vw';

          return value > 0 ?
            `calc(${this.toFixed(baseValue, this.opts.unitPrecision)}${this.opts.unit} + ${this.toFixed(diff * 100 / this.opts.breakpoint, this.opts.unitPrecision)}${viewportUnit})` :
            `calc(-${this.toFixed(baseValue, this.opts.unitPrecision)}${this.opts.unit} - ${this.toFixed(diff * 100 / this.opts.breakpoint, this.opts.unitPrecision)}${viewportUnit})`;
        });
      }

      // Now we will transform the existing rgba() function node
      // into a word node with the hex value
      node.type = 'word';
      node.value = valueParser.stringify(node.nodes);
    });

    return parsed.toString();
  }

  // Return the value without `rfs()` function
  // eg. `4px rfs(32px)` => `.25rem 2rem`
  value(value) {
    return this.process(value, false);
  }

  // Convert `rfs()` function to fluid css
  // eg. `4px rfs(32px)` => `.25rem calc(1.325rem + 0.9vw)`
  fluidValue(value) {
    return this.process(value, true);
  }

  renderMediaQuery() {
    const mediaQuery = {
      name: 'media'
    };

    const dimPrefix = this.opts.mode === 'min-media-query' ? 'min' : 'max';
    const dimConnector = this.opts.mode === 'min-media-query' ? ' and' : ',';
    const breakpoint = this.opts.breakpointUnit === 'px' ? this.opts.breakpoint : this.opts.breakpoint / this.opts.remValue;

    mediaQuery.params = this.opts.twoDimensional ?
      `(${dimPrefix}-width: ${breakpoint}${this.opts.breakpointUnit})${dimConnector} (${dimPrefix}-height: ${breakpoint}${this.opts.breakpointUnit})` :
      `(${dimPrefix}-width: ${breakpoint}${this.opts.breakpointUnit})`;

    return postcss.atRule(mediaQuery);
  }

  getOptions() {
    return this.opts;
  }
};
