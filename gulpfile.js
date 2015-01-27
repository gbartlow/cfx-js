var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream');

gulp.task('browserify', function() {
    return browserify('./src/cfx.js')
        .bundle()

        .pipe(source('cfx.js'))
        .pipe(gulp.dest('./dist'))

        .pipe(rename({ extname: '.min.js' }))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['compile']);
});

gulp.task('compile', ['browserify']);
gulp.task('default', ['compile', 'watch']);
