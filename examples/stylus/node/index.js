const fs = require('fs');
const stylus = require('stylus');


sass.render({
    file: 'src/main.sass', outFile: 'dest/main.css',
  }, function (error, result) { // node-style callback from v3.0.0 onwards
    if (!error) {
      // No errors during the compilation, write this result on the disk
      fs.writeFile('dest/main.css', result.css, function (err) {
        if (!err) {
          console.log('Responsive font sizes generated.');
        }
        else {
          throw err;
        }
      });
    }
    else {
      throw error;
    }
  }
);
