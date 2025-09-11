const gulp = require('gulp');
const { series, parallel } = require('gulp');


var concat = require('gulp-concat');

gulp.task('copy', function() {
  return gulp.src(['./dependencies/*'])
    .pipe(gulp.dest('./public/'));

})

gulp.task('scripts', function() {
  return gulp.src([
    './dependencies/handlebars.js',
    './dependencies/jquery.js',
    './dependencies/underscore.js',
    './dependencies/backbone.js',
    './dependencies/bootstrap.js',
    './dependencies/openpgp.js'

  ])
    .pipe(concat('dependencies.js'))
    .pipe(gulp.dest('./public/'));
});


gulp.task('default', parallel("copy", "scripts"));



