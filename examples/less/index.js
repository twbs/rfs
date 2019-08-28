'use strict';

const fs = require('fs');
const path = require('path');
const less = require('less');

const str = fs.readFileSync(path.join(__dirname, '/src/main.less'), 'utf8');

less.render(
  str,
  {
    paths: [path.join(__dirname, '/src')]
  }
).then(
  output => {
    fs.writeFile(path.join(__dirname, '/dest/main.css'), output.css, err => {
      if (err) {
        throw err;
      }
    });
  },
  error => {
    throw error;
  }
);
