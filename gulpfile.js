var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function() {
    return sass('scss/app.scss', {
        'sourcemap': true,
        'style': 'expanded',
        'lineNumbers': true
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css'));
});

gulp.task('connect', function() {
    connect.server({
        port: 8989,
        livereload: true
    });
});

gulp.task('watch', function() {
    gulp.watch('**/*.scss', ['sass-lint', 'sass']);
    gulp.watch('**/*.coffee', ['coffee']);
});

gulp.task('default', ['connect']);
