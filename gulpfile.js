
'use strict';

var gulp = require('gulp'),
   sass = require('gulp-sass'),
//   copy = require('gulp-copy'),
   sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function() {
    return gulp.src(['app/sass/**/*.scss'])
       .pipe(sourcemaps.init())
           .pipe(sass({ outputStyle: 'expanded' })
               .on('error', sass.logError))
       .pipe(sourcemaps.write('./'))
       .pipe(gulp.dest('app/css'));

});



gulp.task('copy_bower_components', [
    'copy_bower:jquery',
    'copy_bower:backbone',
    'copy_bower:normalize'
]);


// Copy bower jQuery library to app/js/vendor
gulp.task('copy_bower:jquery', function() {
    return gulp.src('bower_components/jquery/dist/jquery*.js')
        .pipe(gulp.dest('app/js/vendor'));
});

// Copy bower Backbone library to app/js/vendor
gulp.task('copy_bower:backbone', function() {
    return gulp.src('bower_components/backbone/backbone*.js')
        .pipe(gulp.dest('app/js/vendor'));
});

// Copy bower normalize.css library to app/css
gulp.task('copy_bower:normalize', function() {
    return gulp.src('bower_components/normalize-css/normalize.css')
        .pipe(gulp.dest('app/css'));
});

gulp.task('default', ['sass']);

gulp.task('install', ['copy_bower_components']);
