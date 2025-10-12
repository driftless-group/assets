const gulp = require('gulp');
const { series, parallel } = require('gulp');


var concat = require('gulp-concat');

gulp.task('copy', function() {
  return gulp.src(['./dependencies/*', './helpers.js'])
    .pipe(gulp.dest('./public/'));

})

gulp.task('mocha', function() {
  return gulp.src(['./node_modules/mocha/mocha.js', './node_modules/mocha/mocha.css'])
    .pipe(gulp.dest('./public/'));

})

gulp.task('scripts', function() {
  return gulp.src([
    './dependencies/handlebars.js',
    './dependencies/jquery.js',
    './dependencies/socket.io.js',
    './dependencies/underscore.js',
    './dependencies/backbone.js',
    './dependencies/bootstrap.js',
    './dependencies/openpgp.js',
    './dependencies/qrcode.js',
    './helpers.js'
  ])
    .pipe(concat('dependencies.js'))
    .pipe(gulp.dest('./public/'));
});


gulp.task('default', parallel("copy", "mocha", "scripts"));



