

var concat = require('gulp-concat');
 
const { src, dest } = require('gulp');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');

const { watch, series } = require('gulp');


function clean(cb) {
  // body omitted
  cb();
}

function javascript(cb) {
  // body omitted
  cb();
}

function css(cb) {
  // body omitted
  cb();
}


exports.default = function() {
  watch('src/*.css', css);
  watch('src/*.js', series(clean, javascript));
};



