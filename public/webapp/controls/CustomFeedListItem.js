sap.ui.define([
        'sap/ui/core/Control',
        "sap/m/FeedListItem",
        "sap/m/FeedListItemRenderer",
        "jquery.sap.global"
    ],
    function(Control, FeedListItem, JQuery) {

        "use strict";

        return FeedListItem.extend("webapp.controls.CustomFeedListItem", {

            metadata: {
                events: {
                    "htmlTransform": {
                        parameters: {}

                    }
                }

            },

            onAfterRendering: function(oElem) {
                let text = $("#" + oElem.srcControl.sId + "-realtext").html()
                    .replace(/#(\S*)/g,'<a target="_blank" href="http://twitter.com/hashtag/$1?src=hash">#$1</a>');
                $("#" + oElem.srcControl.sId + "-realtext").html(Autolinker.link(text, {

                    email: true,
                    phone: true,
                    mention: 'twitter',
                    stripPrefix: true,
                    newWindow: true,
                    truncate: {
                        length: 0,
                        location: 'end'
                    }
                }));
            },


            renderer: "sap.m.FeedListItemRenderer"

        });
    });