// Modules
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect');

// Source files
var jsSources = ['components/scripts/*.js'],
    sassSources = ['components/sass/style.scss'],
    htmlSources = ['builds/development/*.html'];

// Html
gulp.task('html', function() {
  gulp.src(htmlSources)
  .pipe(connect.reload())
});

// Pipes sass files through compass to deal w/prefixes outputs to css
gulp.task('compass', function() {
  gulp.src(sassSources)
  .pipe(compass({
    sass: 'components/sass',
    css: 'builds/development/css',
    image: 'builds/development/images',
    style: 'expanded'
  })
  .on('error', gutil.log))
  // having issues writing to the correct directory...
  //.pipe(gulp.dest('builds/development/css'))
  .pipe(connect.reload())
});


// Concatenate js files
gulp.task('js', function() {
  gulp.src(jsSources)
  .pipe(concat('script.js'))
  .pipe(browserify())
  .pipe(gulp.dest('builds/development/js'))
  .pipe(connect.reload())
});

// Watch changes to files
gulp.task('watch', function() {
  gulp.watch('components/sass/*.scss', ['compass']);
  gulp.watch(jsSources, ['js']);
  gulp.watch(htmlSources, ['html']);
});

// Live Reload server
gulp.task('connect', function() {
  connect.server({
    root: 'builds/development/',
    livereload: true
  });
});

// Default task
gulp.task('default', ['watch','html','js', 'compass', 'connect'], function() {
  // log to console
  gutil.log("I'm watching you...");
});
