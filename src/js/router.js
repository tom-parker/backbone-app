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
                'search/:query/:section': 'search',
            },

            base : function() {
                this.setCurrentView(BaseView);
            },

            search : function(query, section) {
                this.setCurrentView(ListView, {
                    query : query,
                    section : section
                });
            },

            //switch view based on route
            setCurrentView : function(View, options) {
                var self = this;
                if(this.currentView) {
                    $('.wrapper').fadeOut(function(){
                        self.currentView.remove();
                        self.currentView = new View(options);
                        $(this).fadeIn();
                    });
                    return this;
                }
                self.currentView = new View(options);
            }

        });

        return Router;
    }
);
