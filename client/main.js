import "../imports/api/tweets.js";
import "../imports/api/autolinker.min.js";
sap.ui.getCore().attachInit(function() {
    // Create view
    const oView = sap.ui.xmlview({
        viewName: "webapp.TwitterFeed"
    });

    // Add it to new Shell and place at content div
    new sap.m.Shell({
        app: oView
    }).placeAt("content");
});