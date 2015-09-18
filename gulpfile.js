'use strict';
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');

gulp.task('default', ['js', 'css']);

gulp.task('js', function () {
    return gulp.src('dsv-pp.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/'));
});

gulp.task('css', function () {
    return gulp.src('dsv-pp.css')
        .pipe(csso())
        .pipe(gulp.dest('public/'));
});
