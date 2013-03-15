define(
    [
        'backbone',
        'underscore',
        'text!../templates/base-template.html'
    ],

    function(Backbone, _, baseTemplate) {
        var BaseView = Backbone.View.extend({

            template : _.template(baseTemplate),

            initialize : function() {
                this.render();
            },

            events : {
                'click .js-search' : 'search'
            },

            render : function() {
                this.$el.html(this.template());
                $('.wrapper').html(this.$el);
                return this;
            },

            //Update Backbone history with relevant search term
            search : function(e) {
                e.preventDefault();
                var searchValue = this.$el.find('#search').val();
                if(searchValue !== ''){
                    Backbone.history.navigate('/search/' + searchValue, true);
                }
            }
        });

        return BaseView;
    }
)
