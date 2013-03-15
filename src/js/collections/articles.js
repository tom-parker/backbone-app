define(
    [
        'backbone',
        'models/article'
    ],

    function(Backbone, Article) {
        var Articles = Backbone.Collection.extend({

            model: Article

        });

        return Articles;
    }
);
