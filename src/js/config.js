require.config({
    baseUrl: '/src/js',

    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    },

    paths: {
        domReady: 'libs/require/domReady',
        text: 'libs/require/text',
        jquery: 'libs/jquery',
        underscore: 'libs/underscore',
        backbone: 'libs/backbone'
    }
});
