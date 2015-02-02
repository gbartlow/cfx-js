var gulp = require('gulp'),
    fs = require('fs'),
    path = require('path'),
    rename = require('gulp-rename'),
    htmlreplace = require('gulp-html-replace'),
    compilers = {
        article: require('./compilers/article'),
        aside: require('./compilers/aside')
    };

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
    var markdown = ['intro.md'].concat(
            fs.readdirSync('markdown').map(function(f){
                return path.join('markdown', f);
            })
        ).map(function(filename) {
            return fs.readFileSync(filename, 'UTF-8');
        });
    
    var articleHtml = markdown.map(function(md) {
            return compilers.article(md);
        })
        .reduce(function(html, fileHtml) {
            return html + fileHtml;
        }, '');

    markdown.forEach(compilers.aside.feed);
    
    return gulp.src(paths.source.template)
        .pipe(htmlreplace({
            article: articleHtml,
            aside: compilers.aside.render()
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(paths.dest.index))
});

gulp.task('watch', function() {
    gulp.watch(paths.watched, ['compile']);
});

gulp.task('compile', ['docs']);
gulp.task('default', ['compile', 'watch']);
