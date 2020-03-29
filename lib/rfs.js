const valueParser = require('postcss-value-parser');

const BREAKPOINT_ERROR = 'breakpoint option is invalid, it should be set in `px`, `rem` or `em`.';
const BASE_RFS_ERROR = 'baseValue option is invalid, it should be set in `px` or `rem`.';

module.exports = class {
  constructor(opts) {
    this.opts = {
      baseValue: 20,
      unit: 'rem',
      breakpoint: 1200,
      factor: 10,
      twoDimensional: false,
      unitPrecision: 5,
      remValue: 16,
      functionName: 'rfs',
      enableRfs: true,
      ...opts
    };

    if (typeof this.opts.baseValue !== 'number') {
      if (this.opts.baseValue.endsWith('px')) {
        this.opts.baseValue = Number.parseFloat(this.opts.baseValue);
      } else if (this.opts.baseValue.endsWith('rem')) {
        this.opts.baseValue = Number.parseFloat(this.opts.baseValue) / this.opts.remValue;
      } else {
        console.error(BASE_RFS_ERROR);
      }
    }

    if (typeof this.opts.breakpoint !== 'number') {
      if (this.opts.breakpoint.endsWith('px')) {
        this.opts.breakpoint = Number.parseFloat(this.opts.breakpoint);
      } else if (this.opts.breakpoint.endsWith('em')) {
        this.opts.breakpoint = Number.parseFloat(this.opts.breakpoint) * this.opts.remValue;
      } else {
        console.error(BREAKPOINT_ERROR);
      }
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
      return 0;
    }

    // Render value in desired unit
    if (this.opts.unit === 'rem') {
      return `${this.toFixed(value / this.opts.remValue, this.opts.unitPrecision)}rem`;
    }

    return `${this.toFixed(value, this.opts.unitPrecision)}px`;
  }

  value(declarationValue) {
    const parsed = valueParser(declarationValue);

    // Function walk() will visit all the of the nodes in the tree,
    // invoking the callback for each.
    parsed.walk(node => {
      // Since we only want to transform rfs() values,
      // we can ignore anything else.
      if (node.type !== 'function' && node.value !== this.opts.functionName) {
        return;
      }

      node.nodes.filter(node => node.type === 'word').forEach(node => {
        node.value = node.value.replace(/^(-?\d*\.?\d+)(px|rem)/g, (match, value, unit) => {
          value = Number.parseFloat(value);

          // Convert to px if in rem
          if (unit === 'rem') {
            value *= this.opts.remValue;
          }

          // Only add responsive function if needed
          if (this.opts.baseValue >= Math.abs(value) || this.opts.factor <= 1 || !this.opts.enableRfs) {
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
          const sign = value > 0 ? '+' : '-';

          baseValue = this.toFixed(value > 0 ? baseValue : -baseValue, this.opts.unitPrecision);
          value = this.renderValue(value);
          const fluidValue = this.toFixed(diff * 100 / this.opts.breakpoint, this.opts.unitPrecision);

          return `min(${value}, calc(${baseValue}${this.opts.unit} ${sign} ${fluidValue}${viewportUnit}))`;
        });
      });

      node.type = 'word';
      node.value = valueParser.stringify(node.nodes);
    });

    return parsed.toString();
  }

  getOptions() {
    return this.opts;
  }
};

