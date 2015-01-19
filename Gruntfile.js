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
      external: {
        options: {
          transform: ["literalify"],
          external: ["jquery", "jquery.cookie","underscore", "backbone"]
        },
        src: [libsRoot + pluginName],
        dest: distRoot + pluginName
      },
      bundle: {
        options: {
          transform: ["literalify"]
        },
        src: [libsRoot + pluginName],
        dest: distRoot + pluginName.replace(".js", ".bundle.js")
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
        tasks: ["jshint:build", "browserify"]
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

// TODO:  grunt.loadNpmTasks("grunt-browser-sync");

  // custom tasks: disalbe uglify for now
  grunt.registerTask("dev", ["watch"]);
  grunt.registerTask("build", ["jshint:build", "jscs", "browserify"]);
};
