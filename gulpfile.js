// Modules
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect');
    // modules for production only
    gulpif = require('gulp-if'),
    minifyHTML = require('gulp-minify-html'),
    uglify = require('gulp-uglify');

var env,
    scripts,
    includes,
    html,
    outputDir,
    sassStyle;

//Set environment
env = 'development';

if (env === 'development') {
  outputDir = 'builds/development/';
  sassStyle = 'expanded';
} else {
  outputDir = 'builds/production/';
  sassStyle = 'compressed';
} // output directory

//Imports
scripts = ['components/scripts/script.js'];
includes = ['components/sass/style.scss'];
html = ['builds/development/*.html'];


// Html
gulp.task('html', function() {
  'use strict';
  gulp.src(html)
  //add production later
  .pipe(connect.reload())
});

//Sass includes
gulp.task('compass', function() {
  gulp.src(includes)
  .pipe(compass({
    sass: 'components/sass',
    css: outputDir + 'css',
    image: outputDir + 'images',
    style: sassStyle,
    require: ['breakpoint']
  })
  .on('error', gutil.log))
  .pipe(connect.reload())
});

// Concatenate scripts
gulp.task('js', function() {
  'use strict';
  gulp.src(scripts)
  .pipe(concat('script.js'))
  .pipe(browserify())
  .on('error', gutil.log)
  .pipe(gulp.dest(outputDir + 'js'))
  .pipe(connect.reload())
});

// Watch changes to files
gulp.task('watch', function() {
  gulp.watch(['components/sass/modules/*.scss', 'components/sass/*.scss'], ['compass']);
  gulp.watch(scripts, ['js']);
  gulp.watch(html, ['html']);
});

// Live Reload server
gulp.task('connect', function() {
  'use strict';
  connect.server({
    root: outputDir,
    livereload: true
  });
});

// Default task
gulp.task('default', ['watch','html','js', 'compass', 'connect'], function() {
  // log to console
  gutil.log("Ready.");
});
