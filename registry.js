var fs = require('fs');

module.exports = class AssetRegistry {
  constructor(options={}) {
    Object.assign(this, options);
  }

  init(gulpInst) {
    const exists = fs.existsSync();

    gulpInst.task('clean', function(){
      
     return 
    });

  }

  get(name) {
    console.log(name)
  }

  set(name, fn) {}

  tasks() {}
}
