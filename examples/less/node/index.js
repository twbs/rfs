const fs = require('fs'),
  less = require('less'),
  str = fs.readFileSync(__dirname + '/src/main.less', 'utf8');

less.render(str, { paths: [__dirname + '/src']  })
  .then(function(output) {
      fs.writeFile(__dirname + '/dest/main.css', output.css, function (err) {
        if (!err) {
          console.log('Responsive font sizes generated.');
        }
        else {
          throw err;
        }
      });
    },
    function(error) {
      throw error;
    });
