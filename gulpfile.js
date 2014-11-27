var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var scsslint = require('gulp-scss-lint');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
    return sass('scss/app.scss', {
        'sourcemap': true,
        'style': 'expanded',
        'lineNumbers': true
    })
    .pipe(autoprefixer({ browsers: ['last 2 version', 'Firefox < 20', '> 5%'] }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css'))
    .pipe(connect.reload());
});

gulp.task('sass-lint', function() {
    return gulp.src('scss/app.scss')
        .pipe(scsslint({
            'config': '.scss-lint.yml'
        }));
});

gulp.task('sass-minify', function() {
    return gulp.src('css/app.css')
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('connect', function() {
    connect.server({
        port: 8989,
        livereload: true
    });
});

gulp.task('watch', function() {
    gulp.watch('**/*.scss', ['sass', 'sass-lint']);
});

gulp.task('build', ['sass', 'sass-minify']);
gulp.task('default', ['sass', 'sass-lint', 'connect', 'watch']);
