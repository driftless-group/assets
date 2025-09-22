const crypto = require('crypto');

function check(details={}, req, res, next) {
  if (typeof details != 'string') {
    details = JSON.stringify(details);
  }
  var etag = crypto.createHash('md5').update(details).digest('hex');

  res.set('Etag', etag);

  if (req.headers['if-none-match'] == etag) {
    res.status(304).end();
  } else {
    next();
  }

}
module.exports = check;
