var gulp        = require('gulp');
var changed     = require('gulp-changed');
var gulpif      = require('gulp-if');
var config      = require('../config');

function renderHtml(onlyChanged) {
    return gulp
        .src([config.src.templates])
        //.pipe(gulpif(onlyChanged, changed(config.dest.html, { extension: '.html' })))
        .pipe(gulp.dest(config.dest.html));
}

gulp.task('template', function() {
    return renderHtml();
});

gulp.task('template:changed', function() {
    return renderHtml(true);
});

gulp.task('template:watch', function() {
    gulp.watch([config.src.templates], ['template']);
    gulp.watch([config.src.templates], ['template:changed']);
});
