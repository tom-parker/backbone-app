define(
    [
        'backbone',
        'underscore',
        'text!../templates/base-template.html'
    ],

    function(Backbone, _, baseTemplate) {
        var BaseView = Backbone.View.extend({
            template: _.template(baseTemplate),

            el: $('.wrapper'),

            initialize: function() {
                console.log('init');
                this.render();
            },

            events: {
                'click .js-search' : 'search'
            },

            render: function() {
                this.$el.html(this.template());
            },

            search: function(e) {
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
