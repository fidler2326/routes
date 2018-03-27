var gulp = require('gulp');


// Enviroment vars
// ---------------
var compiledFolder = 'app/';
var srcFolder      = 'app/';


// Plugins
// -------
var
	autoprefixer = require('gulp-autoprefixer'),
  browserSync  = require('browser-sync').create(),
  sass         = require('gulp-sass'),
  uglify       = require('gulp-uglify'),
  concat       = require('gulp-concat');


// Browsersync
// -----------
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    open : false,
    server : {
      index : "index.html"
    }
  });
  gulp.watch(srcFolder + "/stylesheets/*.scss", ['sass']);
  gulp.watch(srcFolder + "/javascript/**/*.js", ['scripts']);
  gulp.watch(srcFolder + "/templates/**/*.html").on('change', browserSync.reload);
	gulp.watch("index.html").on('change', browserSync.reload);
});


// Styles
// ------
gulp.task('sass', function() {
  return gulp.src(srcFolder + "/stylesheets/*.scss")
    .pipe(sass())
    .pipe(autoprefixer(
			{ browsers: ['last 3 versions'] }
		))
    .pipe(gulp.dest("./"))
    .pipe(browserSync.stream());
});


// Scripts
// -------
gulp.task('scripts', function() {
  return gulp.src(srcFolder + '/javascript/**/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./'));
});


// Watch
// -----
gulp.task('watch', function(){
	gulp.watch(srcFolder + '/stylesheets/app.scss', ['sass']);
});


// For heroku
// ----------
gulp.task('serveprod', function() {
  connect.server({
    root: "index.html",
    port: process.env.PORT || 5000, // localhost:5000
    livereload: false
  });
});


// Default trigger (typing 'gulp' at command line triggers these tasks)
// --------------------------------------------------------------------
gulp.task('default', ['sass', 'watch', 'serve', 'scripts']);
