const path = require('fs');
const fs   = require('fs');

function exists(file) {
  return new Promise((resolve) => {
    var filepath = path.join(directory, file);
    resolve(fs.existsSync(file));
  })
} 

function finder(directories, file) {
  return JSON.parse(JSON.stringify(directories)).reduce(async(files, directory) => {
    if (files.length == 0) {
      var filepath = path.join(directory, file);
      var found = await exists(filepath);
      if (found) {
        files.push(filepath)
      }
    }
    return files;
  }, [])
}

module.exports = finder;
