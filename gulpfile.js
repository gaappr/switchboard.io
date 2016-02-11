var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

gulp.task('lint', function(){
    gulp.src('./*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('unit-test', function(){
    gulp.src('test/*.js')
    .pipe(mocha());
});

gulp.task('default', ['lint', 'unit-test']);
