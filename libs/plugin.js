/* Backbone.App
*
*/
var $ = require("jquery"),
  _ = require("underscore"),
  Backbone = require("backbone");
require("jquery.cookie");

//cookie setup w json parse/stringify
//$.cookie.json = true;

var AppState = Backbone.Model.extend({
  initialize: function (options) {
    this.storeType = options.storeType || "cookie";
    this.storeKey = options.storeKey || "appState";
    this.storeExpire = options.storeExpire || 30; //30 days

    _.bindAll(this, "_getState");
    this.on("change", this.save, this);
    this.fetch();
  },

  fetch: function () {
    var objState;
    if ("cookie" === this.storeType) {
      objState = this._getState();
      if (objState) {
        this.set(objState);
      }
    }
    return this;
  },

  save: function () {
    //omit config
    var state = _.omit(this.attributes, "storeType", "storeKey", "storeExpire");
    if ("cookie" === this.storeType) {
      $.cookie(this.storeKey, JSON.stringify(state), { expires: this.storeExpire});
    }
  },

  destroy: function () {
    if ("cookie" === this.storeType) {
      $.removeCookie(this.storeKey);
    }
  },

  _getState: function () {
    var strState,
      objState;
    if ("cookie" === this.storeType) {
      strState = $.cookie(this.storeKey);
      try {
        objState = JSON.parse(strState);
      } catch (err) {
        objState = null;
      }
      return objState;
    }
  }
});

module.exports = AppState;
