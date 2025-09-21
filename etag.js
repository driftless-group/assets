const crypto = require('crypto');

function check(details={}) {
  var etag = crypto.createHash('md5').update(JSON.stringify(details)).digest('hex');
 
  return function(req, res, next) {
    res.set('Etag', etag);

    if (req.headers['if-none-match'] == etag) {
      res.status(304).end();
    } else {
      next();
    }
  }

}
module.exports = check;
