const path = require('path');
const fs   = require('fs');

const defaultPath = path.join(process.cwd(), 'public')

let gather = require(path.join(__dirname, 'gather'));
let finder = require(path.join(__dirname, 'finder'));

module.exports = function(options={}) {
  
  if (options.paths == undefined) {
    options.paths = [];
    if (fs.existsSync(defaultPath)) {
      options.paths.push(path.join(process.cwd(), 'public'))
    }
  }

  return function(req, res, next) {
    var files = finder(options.paths, req.url), file;
    if (files.length > 0) {
      file = {host: req.host, url: req.url, path: files[0]}
    }

    // maybe I should cache things in production?

    if (file != undefined) {
      const readStream = fs.createReadStream(file.path);
      readStream.pipe(res);
    } else {
      next();
    }
  }

}



