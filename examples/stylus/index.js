'use strict';

const fs = require('fs');
const path = require('path');
const stylus = require('stylus');

const str = fs.readFileSync(path.join(__dirname, '/src/main.styl'), 'utf8');

stylus.render(str, {
  filename: path.join(__dirname, '/src/main.styl')
}, (err, css) => {
  if (err) {
    throw err;
  }

  fs.writeFile(path.join(__dirname, '/dest/main.css'), css, err => {
    if (err) {
      throw err;
    }
  });
});
