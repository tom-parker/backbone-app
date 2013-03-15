/* global module:false */
module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib');

    // ==========================================================================
    // TASKS
    // ==========================================================================

    grunt.initConfig({

        // js linting
        lint: {
            files: [
            ]
        },

        // tasks to be executed and files
        // to be watched for changes
        watch: {
            files: ['src/css/less/styles.less'],
            tasks: ['less']
        },

        less: {
            compile: {
                options: {
                    paths: ["src/css/less"]
                },
                files: {
                    "src/css/styles.css": "src/css/less/styles.less",
                }
            }
        },

        // require js
        requirejs: {

            dir: 'src/js/build',

            appDir: 'src/js',
            mainConfigFile: 'src/js/config.js',

            baseUrl: './',

            optimize: 'uglify',

            modules: [
                    {
                        name: "competitors/app"
                    },
                    {
                        name: 'campaigns/app'
                    },
                    {
                        name: 'today/app'
                    },
                    {
                        name: 'followers/app'
                    }
            ]
        },

        server: {
            port: 3000,
            base: './'
        }

    });

    // launch node server to view the projct
    grunt.registerTask('launch', 'server watch');
    grunt.registerTask('build', 'requirejs');

};
