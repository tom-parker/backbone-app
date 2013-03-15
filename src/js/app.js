require(
    [
        'domReady!',
        'backbone',
        'router'
    ],

    function (doc, Backbone, Router) {
        //Create router and start history
        var router = new Router();
        Backbone.history.start({pushState: true});

        //Code from backbone boilerplate to catch navigation and make sure
        //it is handled by Backbone history
        $(document).on("click", "a:not([data-bypass])", function(evt) {
            var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
            var root = location.protocol + "//" + location.host;

            if (href.prop && href.prop.slice(0, root.length) === root) {
                evt.preventDefault();

                Backbone.history.navigate(href.attr, true);
            }
        });
    }
);
