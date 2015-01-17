module.exports = function(grunt) {

  var libsRoot = "libs/",
    distRoot = "dist/",
    pluginName = "plugin.js";

  // Config task
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    jshint: {
      "build": {
        options: {
          jshintrc: ".jshintrc"
        },
        files: {
          src: [
            libsRoot + pluginName,
            "!" + distRoot + "*"
          ]
        }
      }
    },

    jscs: {
      build: {
        options: {
          config: ".jscsrc"
        },
        src: libsRoot + "*.js"
      }
    },

    browserSync: {
      default_options: {
        bsFiles: {
          src: [
            "examples/*.html"
          ]
        }
      },
      options: {
        watchTask: true
      }
    },

    browserify: {
      client: {
        options: {
          transform: ["literalify"]
        },
        src: [libsRoot + pluginName],
        dest: distRoot + pluginName
      }
    },

    uglify: {
      options: {
        mangle: true, //false to prevent change variable name
        banner: "/*! <%= pkg.name %>.min <%= grunt.template.today('yyyy-mm-dd') %> */\n"
      },
      build: {
        src: distRoot + pluginName,
        dest: distRoot + pluginName.replace(".js", ".min.js")
      }
    },

    watch: {
      scripts: {
        files: [libsRoot + pluginName],
        tasks: ["jshint:build", "browserify:client"]
      }
    }
  });

  // plugin tasks
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-jscs");
  grunt.loadNpmTasks("grunt-githooks");

  //TODO:
//  grunt.loadNpmTasks("grunt-browser-sync");

  // custom tasks
  grunt.registerTask("dev", ["watch", "browserSync"]);
  grunt.registerTask("build", ["jshint:build", "jscs", "browserify:client", "uglify"]);

//  var browserify = require("browserify"),
//    literalify = require("literalify"),
//    fs = require("fs");
//  grunt.registerTask("literalify", "covert browserify to browser", function () {
//    grunt.log.writeln("Processing literalify task...");
//    var b = browserify();
//    // map module names with global objects
//    b.transform(literalify.configure({
//      "jquery": "window.$"
//    }));
//    b.add("lib/jquery.powerpack.js");
//    b.bundle().pipe(fs.createWriteStream("dist/bundle.js"));
//  });
};
