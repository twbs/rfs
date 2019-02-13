'use strict';

const fs = require('fs');
const path = require('path');
const sass = require('node-sass');

sass.render({
  file: path.join(__dirname, '/src/main.scss'),
  outFile: path.join(__dirname, '/dest/main.css')
}, (error, result) => { // Node-style callback from v3.0.0 onwards
  if (error) {
    throw error;
  } else {
    // No errors during the compilation, write this result on the disk
    fs.writeFile(path.join(__dirname, '/dest/main.css'), result.css, err => {
      if (err) {
        throw err;
      } else {
        console.log('Responsive font sizes generated.');
      }
    });
  }
}
);
