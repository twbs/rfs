const fs = require('fs'),
  stylus = require('stylus'),
  str = fs.readFileSync(__dirname + '/src/main.styl', 'utf8');

stylus.render(str, {filename: __dirname + '/src/main.styl'}, function (err, css) {
  if (err) {
    throw err;
  }
  else {
    fs.writeFile(__dirname + '/dest/main.css', css, function (err) {
      if (!err) {
        console.log('Responsive font sizes generated.');
      }
      else {
        throw err;
      }
    });
  }
});
