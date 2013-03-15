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

            initialize : function() {
                //Create empty collection for articles
                this.collection = new Articles();

                //Fetch content from the server
                this.loadData();

                this.listenTo(this.collection, 'add', this.addArticle);
                this.render();
            },

            events : {
                'click .load-more' : 'loadMoreData'
            },

            render : function() {
                this.$el.html(this.template({
                    'query' : this.options.query,
                    'section' : this.options.section
                }));

                $('.wrapper').html(this.$el);

                this.articleContainer = this.$('.article-container');
            },

            //Remove loading UI components
            removeLoadingState : function() {
                this.articleContainer.removeClass('loading');
                this.$el.find('.load-more').removeClass('hidden');
            },

            //Pass query and section to DataLayer to make initial request
            loadData : function() {
                var query = (this.options.query === 'latest') ? '' : this.options.query;
                var section = (this.options.section) ? this.options.section : '';
                var self = this;

                var request = DataLayer.initialRequest(query, section);

                request.done(function(data){
                    self.removeLoadingState();
                    self.collection.add(data.response.results);
                });

                request.fail(function(){
                    self.$el.find('.alpha').text('Failed to load data');
                });
            },

            //Call to DataLayer to get next page of results
            loadMoreData : function(e) {
                e.preventDefault();
                var self = this;
                var el = $(e.target);
                el.addClass('loading');

                var request = DataLayer.getNextPage();

                request.done(function(data){
                    el.removeClass('loading');
                    self.collection.add(data.response.results);
                });
            },

            //Add new article to List view
            addArticle : function(article) {
                var articleView = new ListItemView({
                    model : article,
                    section : this.options.section
                });
                this.articleContainer.append(articleView.render().el);
            }

        });

        return ListView;
    }
);
