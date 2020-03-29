'use strict';

module.exports = {
  'test-1': {},
  'test-2': {
    enableRfs: false
  },
  'test-3': {
    breakpointUnit: 'em'
  },
  'test-4': {
    baseValue: '17px'
  },
  'test-5': {
    unit: 'px'
  },
  'test-6': {
    twoDimensional: true
  },
  'test-7': {
    baseValue: '12px',
    unit: 'px',
    breakpoint: 800,
    breakpointUnit: 'rem',
    twoDimensional: true,
    factor: 5,
    class: true
  },
  'test-8': { // Not testable
    baseValue: '12px',
    unit: 'px',
    breakpoint: 800,
    breakpointUnit: 'rem',
    twoDimensional: true,
    factor: 5,
    class: true
  }
};
