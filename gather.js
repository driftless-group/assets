const path = require('path');
const fs   = require('fs');

module.exports = function(name, options={}) {

  if (options.json == undefined) {
    options.json = false;
  }

  if (options.cwd == undefined) {
    options.cwd = process.cwd();
  }

  if (options.full_name == undefined) {
    options.full_name = false
  }

  var directory = path.join(options.cwd, name);
  var files      = fs.readdirSync(directory);

  var files = files.reduce((obj, filename) => {
    var name;
    if (options.full_name == false) {
      name = filename.split('.').shift();
    } else {
      name = filename;
    }
    var contents = fs.readFileSync(path.join(directory, filename)).toString();
    
    if (options.json == false) {
      obj[name]  = contents;
    } else {
      try {
        obj[name] = JSON.parse(contents);
      } catch(error) {
        console.log(error);
        console.log(name);
        console.log(contents);
      }
    }

    return obj
  }, {})

  return files;
}
