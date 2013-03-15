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
                'query' : '',
                'section' : ''
            };

            //Make initial request to Guardian API
            this.initialRequest = function(query, section) {
                this.state.query = query;
                this.state.section = section;
                return this.makeRequest();
            };

            //Retrieve extra pages of content based on a pageIndex from 1
            this.getNextPage = function() {
                this.state.pageIndex = parseInt(this.state.pageIndex) + 1;
                return this.makeRequest();
            };

            //Return deffered object to callee
            this.makeRequest = function() {
                return $.ajax({
                    url: this.buildUrl(),
                    type: 'GET',
                    dataType: 'jsonp'
                });
            };

            //Build URL helper
            this.buildUrl = function() {
                return this.baseUrl + 'search?q=' + this.state.query + '&section=' + this.state.section +'&page=' + this.state.pageIndex + '&format=json&show-fields=body,thumbnail&show-redistributable-only=body&api-key=' + this.apiKey;
            };

        };

        return new DataLayer();
    }
)
