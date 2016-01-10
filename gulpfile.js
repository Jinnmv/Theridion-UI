
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
/*var copy = require('gulp-copy');*/
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var size = require('gulp-size');
var newer = require('gulp-newer');
var gulpif = require('gulp-if');
var minifyCss = require('gulp-minify-css');
var browserSync = require('browser-sync');

const reload = browserSync.reload;


gulp.task('styles', function() {
    const AUTOPREFIXER_BROWSERS = [
        'ie >= 10',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4.4',
        'bb >= 10'
      ];

    return gulp.src([
        'app/sass/**/*.scss',
        'app/css/**/*.css'
    ])
        .pipe(newer('app/css'))
        .pipe(sourcemaps.init())
            .pipe(sass({
                outputStyle: 'expanded',
                precision: 5
            }).on('error', sass.logError))
            .pipe(prefix(AUTOPREFIXER_BROWSERS))
        .pipe(gulp.dest('app/css'))
        .pipe(size({ title: 'styles' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist/css'));
});


gulp.task('serve', ['styles'], function() {
    browserSync({
        notify: false,
        // Customize the Browsersync console logging prefix
        logPrefix: 'WSK',
        // Allow scroll syncing across breakpoints
        scrollElementMapping: ['main', '.mdl-layout'],

        server: ['app'],
        port: 3000
    });

    gulp.watch(['app/**/*.html'], reload);
    gulp.watch(['app/sass/**/*.scss', 'app/css/**/*.css'], ['styles', reload]);
    // gulp.watch(['app/js/**/*.js'], ['lint', 'scripts']);
    // gulp.watch(['app/img/**/*'], reload);
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


gulp.task('default', ['styles']);

gulp.task('install', ['copy_bower_components']);
