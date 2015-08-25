// Pre v1.0.0 basic unit tests.

describe("resrc.js", function () {

  "use strict";

  it("is attached to the window object", function () {
    expect(window.resrc).toBeDefined();
  });

  it("exposes the correct public API", function () {
    expect(resrc).toHaveMethod("ready");
    expect(resrc).toHaveMethod("run");
    expect(resrc).toHaveMethod("extend");
    expect(resrc).toHaveMethod("configure");
    expect(resrc).toHaveMethod("getElementsByClassName");
    expect(resrc).toHaveMethod("getResrcImageObject");
    expect(resrc).toHaveObject("options");
  });


  describe("The version number", function() {

    it("exists", function() {
      expect(resrc.version).toBeDefined();
    });

    it ("is a string", function() {
      expect(resrc.version).toBeString();
    });

    it ("follows the semantic versioning specification", function() {
      expect(resrc.version).toMatch(/^[0-9]+\.[0-9]+\.[0-9]+$/);
    });

  });


  describe("when calling the public API", function () {

    var img;
    var remoteImg = "http://www.your-site.co/image.jpg";

    beforeEach(function() {
      img = document.createElement("img");
      img.className = "resrc";
      img.src = remoteImg;
      document.body.appendChild(img);
    });

    afterEach(function() {
      document.body.removeChild(img);
    });

    it(".ready() triggers a callback function", function () {
      var resrcReady = false;
      resrc.ready(function () {
        resrcReady = true;
      });
      expect(resrcReady).toBe(true);
    });

    it(".run() resrc's an image", function () {
      expect(resrc.run().length).toEqual(1);
    });

    it(".extend() merges 2 objects together", function () {
      var obj = {drink : "rum"};
      resrc.extend(resrc.options, obj);
      expect(resrc.options.drink).toBe("rum");
    });

    it(".configure() passes the new values to the resrc options", function () {
      resrc.configure({resrcClass : "resp-img"});
      expect(resrc.options.resrcClass).toBe("resp-img");
    });

    it(".getElementsByClassName() finds the correct images", function () {
      expect(resrc.getElementsByClassName("resrc")[0].className).toEqual("resrc");
    });

    it(".getResrcImageObject() produces the resrc image object", function () {
      expect(resrc.getResrcImageObject(img)).toBeObject();
    });

  });


  describe("A resrc'd image", function () {

    var img;
    var remoteImg = "http://www.your-site.co/image.jpg";

    beforeEach(function() {
      img = document.createElement("img");
      img.src = remoteImg;
      document.body.appendChild(img);
    });

    afterEach(function() {
      document.body.removeChild(img);
    });

    it("has a valid width", function () {
      expect(resrc.getResrcImageObject(img).width).toBeNumber();
    });

    it("has a valid height", function () {
      expect(resrc.getResrcImageObject(img).height).toBeNumber();
    });

    it("has a remote image for fallback", function () {
      expect(resrc.getResrcImageObject(img).fallbackImgPath).toBe(remoteImg);
    });

    it("has a width or height, pixel density and optimisation parameter", function () {
      var regexParams = new RegExp(/s=(w|h)(\d+),pd(\d+\.\d|\d+?)\/o=(100|[1-9][0-9]?)/);
      expect(resrc.getResrcImageObject(img).params).toMatch(regexParams);
    });

  });


  describe("Parsing a resrc'd image optimisation parameter", function() {

    var img;
    var remoteImg = "http://www.your-site.co/image.jpg";

    beforeEach(function() {
      img = document.createElement("img");
      document.body.appendChild(img);
    });

    afterEach(function() {
        document.body.removeChild(img);
    });

    it("contains all correct possible variations", function() {
      var regexOptimisationParams = new RegExp(/(o=\d+,[b|p])/);
      img.setAttribute("data-src","o=80/"+remoteImg);
      expect(resrc.getResrcImageObject(img).resrcImgPath).toContain("o=80");
      img.setAttribute("data-src","o=30(90)/"+remoteImg);
      expect(resrc.getResrcImageObject(img).resrcImgPath).toContain("o=90");
      img.setAttribute("data-src","o=85,b/"+remoteImg);
      expect(resrc.getResrcImageObject(img).params).toMatch(regexOptimisationParams);
      img.setAttribute("data-src","o=85,P/"+remoteImg);
      expect(resrc.getResrcImageObject(img).params).toMatch(regexOptimisationParams);
    });

  });


  describe("Parsing a resrc'd image size parameter", function() {

    var img;
    var div;
    var remoteImg = "http://www.your-site.co/image.jpg";

    beforeEach(function() {
      img = document.createElement("img");
      div = document.createElement("div");
      document.body.appendChild(div);
      div.appendChild(img);
    });

    afterEach(function() {
      document.body.removeChild(div);
      document.body.appendChild(img);
    });

    it("contains the correct width", function() {
      img.setAttribute("data-src",remoteImg);
      div.style.width = "640px";
      div.style.height = "480px";
      expect(resrc.getResrcImageObject(img).params).toContain("s=w640");
    });

    it("contains the correct height", function() {
      img.setAttribute("data-src",remoteImg);
      div.style.width = "480px";
      div.style.height = "640px";
      expect(resrc.getResrcImageObject(img).params).toContain("s=h640");
    });

    it("sets the maximum pixel width allowed", function() {
      img.setAttribute("data-src",remoteImg);
      div.style.width = "99999px";
      expect(resrc.getResrcImageObject(img).params).toContain("s=w10000");
    });

    it("sets the maximum pixel height allowed", function() {
      img.setAttribute("data-src",remoteImg);
      div.style.height = "99999px";
      expect(resrc.getResrcImageObject(img).params).toContain("s=h10000");
    });

  });

});