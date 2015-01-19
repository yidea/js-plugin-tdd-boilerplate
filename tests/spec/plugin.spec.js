var expect = require('chai').expect,
  sinon = require('sinon');
var AppState = require("../../libs/plugin");

describe("plugin", function () {
  describe("AppState Backbone", function () {
    it("should work in general cases", function () {
      // when
      this.AppState = new AppState({storeKey: "tireFinder", storeType: "cookie"});
      this.AppState.set("inProcess", true);
      // then
      expect(this.AppState._getState()).to.eql({
        "inProcess": true
      });
    });
  });

});
