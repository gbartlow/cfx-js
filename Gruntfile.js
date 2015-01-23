module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            dist: {
                files: {
                    'dist/cfx.js': [ 'src/**/*.js' ]
                }
            }
        },
        watch: {
            js: {
                files: 'src/**/*.js',
                tasks: ['browserify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');

    var tasks = [ 'browserify' ];
    grunt.registerTask('compile', tasks);
    grunt.registerTask('default', tasks.concat([ 'watch' ]));
};