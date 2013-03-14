define(
    [
        'jquery',
        'underscore'
    ],

    function($, _) {
        var DataLayer = function() {
            this.baseUrl = 'http://content.guardianapis.com/';
            this.apiKey = 'b3a28xmd8zgbt8uakda64279';
            this.state = {
                'pageIndex' : '1',
                'pageSize' : '10',
                'query' : ''
            };

            this.initialRequest = function(query) {
                this.state.query = query;
                return this.makeRequest();
            };

            this.getNextPage = function() {
                this.state.pageIndex = parseInt(this.state.pageIndex) + 1;
                return this.makeRequest();
            };

            this.makeRequest = function() {
                return $.ajax({
                    url: this.buildUrl(),
                    type: 'GET',
                    dataType: 'jsonp'
                });
            };

            this.buildUrl = function() {
                return this.baseUrl + 'search?q=' + this.state.query + '&page=' + this.state.pageIndex + '&format=json&show-fields=body&show-redistributable-only=body&api-key=' + this.apiKey;
            };

        };

        return new DataLayer();
    }
)
