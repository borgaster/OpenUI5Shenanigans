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
                let $tweetContent = $("#" + oElem.srcControl.sId + "-realtext");
                let $twitterUser = $("#" + oElem.srcControl.sId + "-name");
                let text = $tweetContent.html()
                    .replace(/#(\S*)/g,'<a target="_blank" href="http://twitter.com/hashtag/$1?src=hash">#$1</a>');
                $tweetContent.html(Autolinker.link(text, {
                    email: true,
                    phone: true,
                    mention: 'twitter',
                    stripPrefix: true,
                    newWindow: true
                }));
                let formattedTwitterUser = $twitterUser.text().slice(0, -2);
                $twitterUser.children().attr("href", "https://www.twitter.com/"+formattedTwitterUser).attr("target", "_blank");
            },


            renderer: "sap.m.FeedListItemRenderer"

        });
    });