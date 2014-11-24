var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('gulp-connect');

gulp.task('connect', function() {
    connect.server({
        port: 8989,
        livereload: true
    });
});

gulp.task('default', ['connect']);
