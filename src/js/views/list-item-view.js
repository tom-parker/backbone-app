define(
    [
        'backbone',
        'underscore',
        'text!../templates/list-item-template.html'
    ],

    function(Backbone, _, listItemTemplate) {
        var ListItemView = Backbone.View.extend({
            template : _.template(listItemTemplate),

            initialize : function() {
            },

            render : function() {
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            }
        });

        return ListItemView;
    }
);
