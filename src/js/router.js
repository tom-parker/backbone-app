define(
    [
        'backbone',
        'views/base-view',
        'views/list-view'
    ],

    function (Backbone, BaseView, ListView) {
        var Router = Backbone.Router.extend({
            currentView : null,
            routes : {
                '': 'base',
                'search/:query': 'search',
            },

            base : function() {
                console.log('base route');
                this.setCurrentView(BaseView);
            },

            search : function(query) {
                this.setCurrentView(ListView, {
                    query : query
                });
            },


            setCurrentView : function(View, options) {
                var view;
                if(this.currentView) {
                    this.currentView.destory();
                }

                view = new View(options);
            }

        });

        return Router;
    }
);
