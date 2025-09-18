const path = require('path');
const fs   = require('fs');
const crypto = require('crypto');

const defaultPath = path.join(process.cwd(), 'public')

let gather = require(path.join(__dirname, 'gather'));
let finder = require(path.join(__dirname, 'finder'));

module.exports = function(options={}) {
 
  if (options.cache == undefined) {
    options.cache = process.env.NODE_ENV == 'production';
  }

  if (options.default == undefined) {
    options.default = true;
  }

  if (options.path == undefined) {
    options.path = [];
    if (fs.existsSync(defaultPath) && options.default) {
      options.path.push(path.join(process.cwd(), 'public'))
    }
  }

  return function(req, res, next) {
    if (req.url == '/') {
      return next();
    }

    //console.log(req.headers);

    var files = finder(options.path, req.url), file;
    
    if (files.length > 0) {
      file = {host: req.host, url: req.url, path: files[0]}
    }

    // maybe I should cache things in production?

    if (file != undefined) {
      fs.stat(file.path, function(err, stat) {
        
        file.modified = stat.mtimeMs
        var etag = crypto.createHash('md5').update(JSON.stringify(file)).digest('hex');
        res.set('Etag', etag);
        
        if (req.headers['if-none-match'] == etag) {
          res.status(304);
          res.end();
        } else {
          if (options.cache) {
            res.set('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
          }

          const readStream = fs.createReadStream(file.path);
          readStream.pipe(res);
        }
      }); 

    } else {
      next();
    }
  }

}



