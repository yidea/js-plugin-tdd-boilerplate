var expect = require('chai').expect;
var sinon = require('sinon');

var $ = require("../../libs/plugin");

describe("plugin", function () {
  beforeEach(function () {
    this.fixturesId = "#fixtures-visible";
    this.$fixture = $("<div>text</div>").appendTo($(this.fixturesId));
    this.$div = $("<div>", {
      "css": {"position": "absolute","left": 0, "top": 0, "width": "200px", "height": "200px"},
      "text": "test"
    });
    this.$fixture.append(this.$div);
  });

  afterEach(function () {
    this.$fixture.remove();
  });

  describe("$.isInViewport", function () {
    it("should work in general cases when set {fully: true}", function () {
      expect(this.$div.isInViewport({fully: true})).to.be.true;

      this.$div.css({"left": "-100px"});
      expect(this.$div.isInViewport({fully: true})).to.be.false;

      this.$div.css({"left": "4000px"});
      expect(this.$div.isInViewport({fully: true})).to.be.false;

      this.$div.css({"top": "-100px", "left": 0});
      expect(this.$div.isInViewport({fully: true})).to.be.false;

      this.$div.css({"top": "4000px", "left": 0});
      expect(this.$div.isInViewport({fully: true})).to.be.false;
    });

    it("should work in general cases when set {fully: false} or not set", function () {
      this.$fixture.append(this.$div);
      expect(this.$div.isInViewport({fully: false})).to.be.true;

      this.$div.css({"left": "-100px"});
      expect(this.$div.isInViewport({fully: false})).to.be.true;

      this.$div.css({"left": "-210px", "top": "-210px"});
      expect(this.$div.isInViewport({threshold: 0})).to.be.false;
      expect(this.$div.isInViewport({threshold: 100})).to.be.true;

      this.$div.css({"top": $(window).height() + 100, "left": 0});
      expect(this.$div.isInViewport({threshold: 0})).to.be.false;
      expect(this.$div.isInViewport({threshold: 101})).to.be.true;
    });
  });

  describe("$.belowTheFold()", function () {
    it("should work in general cases", function () {
      this.$fixture.append(this.$div);
      expect(this.$div.belowTheFold()).to.be.false;

      this.$div.css({"top": $(window).height() + 10, "left": 0});
      expect(this.$div.belowTheFold({threshold: 0})).to.be.true;
      expect(this.$div.belowTheFold({threshold: 100})).to.be.false;
    });
  });

  describe("$.aboveTheTop()", function () {
    it("should work in general cases", function () {
      this.$fixture.append(this.$div);
      expect(this.$div.aboveTheTop()).to.be.false;

      this.$div.css({"top": -210, "left": 0});
      expect(this.$div.aboveTheTop({threshold: 0})).to.be.true;
      expect(this.$div.aboveTheTop({threshold: 100})).to.be.false;
    });
  });

  describe("$.rightOfScreen()", function () {
    it("should work in general cases", function () {
      this.$fixture.append(this.$div);
      expect(this.$div.rightOfScreen()).to.be.false;

      this.$div.css({"left": $(window).width() + 10});
      expect(this.$div.rightOfScreen({threshold: 0})).to.be.true;
      expect(this.$div.rightOfScreen({threshold: 100})).to.be.false;
    });
  });

  describe("$.leftOfScreen()", function () {
    it("should work in general cases", function () {
      this.$fixture.append(this.$div);
      expect(this.$div.leftOfScreen()).to.be.false;

      this.$div.css({"left": -210});
      expect(this.$div.leftOfScreen({threshold: 0})).to.be.true;
      expect(this.$div.leftOfScreen({threshold: 100})).to.be.false;
    });
  });

});
