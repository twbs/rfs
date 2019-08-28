'use strict';

module.exports = {
  'test-1': {},
  'test-2': {
    enableRfs: false
  },
  'test-3': {
    class: 'disable'
  },
  'test-4': {
    class: 'enable'
  },
  'test-5': {
    breakpointUnit: 'em'
  },
  'test-6': {
    baseValue: '17px'
  },
  'test-7': {
    unit: 'px'
  },
  'test-8': {
    twoDimensional: true
  },
  'test-9': {
    baseValue: '12px',
    unit: 'px',
    breakpoint: 800,
    breakpointUnit: 'rem',
    twoDimensional: true,
    factor: 5,
    class: true,
    safariIframeResizeBugFix: true
  },
  'test-10': { // Not testable
    baseValue: '12px',
    unit: 'px',
    breakpoint: 800,
    breakpointUnit: 'rem',
    twoDimensional: true,
    factor: 5,
    class: true,
    safariIframeResizeBugFix: true
  },
  'test-11': {
    mode: 'max-media-query'
  }
};
