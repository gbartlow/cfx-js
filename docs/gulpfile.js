var gulp = require('gulp'),
    fs = require('fs'),
    path = require('path'),
    compiler = require('./compiler'),
    rename = require('gulp-rename'),
    htmlreplace = require('gulp-html-replace');

var paths = {
    source: {
        md: ['**/*.md'],
        template: ['template.html'],
        html: ['**/*.html']
    },
    dest: {
        index: '..',
        index_name: 'index.html'
    }
};
paths.watched = paths.source.md
    .concat(paths.source.html)
    .concat(['!'+ path.join(paths.dest.index, paths.dest.index_name)]);

gulp.task('docs', function() {
    var articleHtml = compiler( fs.readFileSync('docs.md', 'UTF-8') );
    
    return gulp.src(paths.source.template)
        .pipe(htmlreplace({
            article: articleHtml
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(paths.dest.index))
});

gulp.task('watch', function() {
    gulp.watch(paths.watched, ['compile']);
});

gulp.task('compile', ['docs']);
gulp.task('default', ['compile', 'watch']);
