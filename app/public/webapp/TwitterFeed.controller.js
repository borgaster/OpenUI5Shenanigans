sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'jquery.sap.global',
  'meteor-ui5-mongo/model/Model'
], function(Controller, jQuery, MongoModel) {
    "use strict";
    var CController = Controller.extend("webapp.TwitterFeed", {
        oTasks: Mongo.Collection.get("Tweets"),
        onInit: function() {
            // Include our custom style sheet
            jQuery.sap.includeStyleSheet("webapp/style.css");
            var oModel = new MongoModel();
            this.getView().setModel(oModel);
            Meteor.subscribe('Tweets');
        },
        onIconPress: function(oElem){
            console.log("clicked");
        },
        onSenderPress: function(oElem){
            console.log(oElem.mParameters);
        }

    });

    return CController;

});