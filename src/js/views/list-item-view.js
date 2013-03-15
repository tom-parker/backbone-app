define(
    [
        'backbone',
        'underscore',
        'text!../templates/list-item-template.html'
    ],

    function(Backbone, _, listItemTemplate) {
        var ListItemView = Backbone.View.extend({

            template : _.template(listItemTemplate),
            className : 'article',

            events : {
                'click .btn' : 'toggleContent'
            },

            render : function() {
                this.$el.html(this.template({
                    model : this.model.toJSON(),
                    section : this.options.section
                }));
                return this;
            },

            toggleContent : function(e) {
                e.preventDefault();
                this.$el.toggleClass('open');
            }
        });

        return ListItemView;
    }
);
