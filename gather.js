const path = require('path');
const fs = require('fs');

module.exports = function(name, options={}) {

  if (options.json == undefined) {
    options.json = false;
  }

  var directory = path.join(__dirname, name);
  var files      = fs.readdirSync(directory);

  var files = files.reduce((obj, filename) => {
    var name     = filename.split('.').shift();
    var contents = fs.readFileSync(path.join(directory, filename)).toString();
    
    if (options.json == false) {
      obj[name]  = contents;
    } else {
      try {
        obj[name] = JSON.parse(contents);
      } catch(error) {
        console.log(error);
      }
    }

    return obj
  }, {})

  return files;
}
