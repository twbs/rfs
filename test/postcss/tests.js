'use strict';

module.exports = {
  'test-1': {},
  'test-2': {
    enableResponsiveFontSizes: false
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
    baseFontSize: '17px'
  },
  'test-7': {
    fontSizeUnit: 'px'
  },
  'test-8': {
    twoDimensional: true
  },
  'test-9': {
    baseFontSize: '12px',
    fontSizeUnit: 'px',
    breakpoint: 800,
    breakpointUnit: 'rem',
    twoDimensional: true,
    factor: 5,
    class: true,
    safariIframeResizeBugFix: true
  },
  'test-10': { // Not testable
    baseFontSize: '12px',
    fontSizeUnit: 'px',
    breakpoint: 800,
    breakpointUnit: 'rem',
    twoDimensional: true,
    factor: 5,
    class: true,
    safariIframeResizeBugFix: true
  }
};
