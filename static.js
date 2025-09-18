const path = require('path');
const fs   = require('fs');

const defaultPath = path.join(process.cwd(), 'public')

let gather = require(path.join(__dirname, 'gather'));
let finder = require(path.join(__dirname, 'finder'));

module.exports = function(options={}) {
  
  if (options.paths == undefined) {
    options.paths = [];
    if (fs.existSync(defaultPath)) {
      options.paths.push(path.join(process.cwd(), 'public'))
    }
  }

  return function(req, res, next) {
    var files = finder(options.paths, req.url)
    console.log(files);
    next();
  }

}



