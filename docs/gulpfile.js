var gulp = require('gulp'),
    fs = require('fs'),
    path = require('path'),
    rename = require('gulp-rename'),
    htmlreplace = require('gulp-html-replace'),
    compilers = require('./compilers');

var paths = {
    source: {
        test_template: ['template_test.html'],
        template: ['template.html'],
        html: ['**/*.html']
    },
    dest: {
        test: 'test',
        index: '..',
        index_name: 'index.html'
    }
};

gulp.task('docs', function() {
    var markdown = compilers.markdown();
    
    return gulp.src(paths.source.template)
        .pipe(htmlreplace({
            article: markdown.article,
            aside: markdown.aside
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(paths.dest.index))
});
gulp.task('src', function() {
    compilers.src();
});
gulp.task('test', function() {
    compilers.tests();
});

gulp.task('compile', ['docs', 'test', 'src']);
gulp.task('default', ['compile', 'watch']);
