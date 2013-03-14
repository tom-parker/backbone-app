define(
    [
        'backbone',
        'underscore',
        'text!../templates/list-template.html',
        'collections/articles',
        'views/list-item-view',
        'modules/data-layer'
    ],

    function(Backbone, _, listTemplate, Articles, ListItemView, DataLayer) {
        var ListView = Backbone.View.extend({
            template: _.template(listTemplate),

            el: $('.wrapper'),

            initialize : function() {
                this.collection = new Articles();

                //load data from API
                this.loadData();

                this.listenTo(this.collection, 'add', this.addArticle);

                this.render();
            },

            events : {
                'click .load-more' : 'loadMoreData'
            },

            render : function() {
                this.$el.html(this.template({
                    'query' : this.options.query
                }));

                this.articleContainer = this.$('.article-container');
            },

            removeLoadingState : function() {
                this.articleContainer.removeClass('loading');
                this.$el.find('.load-more').removeClass('hidden');
            },

            loadData : function() {
                var query = (this.options.query === 'latest') ? '' : this.options.query;
                var request = DataLayer.initialRequest(query);
                var self = this;

                request.done(function(data){
                    self.removeLoadingState();
                    self.collection.add(data.response.results);
                });

                request.fail(function(){
                    self.$el.find('.alpha').text('Failed to load data');
                });
            },

            loadMoreData : function(e) {
                e.preventDefault();
                var request = DataLayer.getNextPage();
                var self = this;

                request.done(function(data){
                    self.collection.add(data.response.results);
                });
            },

            addArticle : function(article) {
                var articleView = new ListItemView({model: article});
                this.articleContainer.append(articleView.render().el);
            }

        });

        return ListView;
    }
);
