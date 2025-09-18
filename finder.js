const path = require('path');
const fs   = require('fs');

function finder(directories, file) {
  return JSON.parse(JSON.stringify(directories)).reduce((found, directory) => {
    if (found.length == 0) {
      var filepath = path.join(directory, file);
      if (fs.existsSync(filepath)) {
        found.push(filepath)
      }
    }
    return found;
  }, [])
}

module.exports = finder;
