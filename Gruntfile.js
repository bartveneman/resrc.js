module.exports = function (grunt) {
  grunt.initConfig({
    pkg : grunt.file.readJSON("package.json"),
    version : "<%=pkg.version%>",
    srcPath : "<%=pkg.main%>",
    distPath : "dist/resrc-<%=version%>.min.js",
    jshint : {
      options : {
        jshintrc : ".jshintrc"
      },
      all : ["<%=srcPath%>", "test/spec/*.js"]
    },
    jasmine : {
      coverage : {
        src : "src/resrc.js",
        options : {
          specs : ["test/spec/resrc.spec.js"],
          helpers: "node_modules/jasmine-expect/dist/jasmine-matchers.js",
          template : require("grunt-template-jasmine-istanbul"),
          keepRunner : true,
          templateOptions : {
            coverage : "test/coverage/coverage.json",
            report : {
              type : "text-summary", // Change to html to generate full report.
              options : {
                dir : "test/coverage"
              }
            },
            thresholds : {
              statements : 75,
              branches : 45,
              functions : 65,
              lines : 75
            }
          }
        }
      }
    },
    uglify : {
      options : {
        banner : grunt.file.read("header.txt"),
        compress : {
          drop_console : true
        },
        mangle : true,
        preserveComments : false,
        report : "gzip"
      },
      build : {
        files : {
          "<%=distPath%>" : ["<%=srcPath%>"]
        }
      }
    },
    watch : {
      scripts : {
        files : ["<%=srcPath%>"],
        tasks : ["jshint", "uglify"]
      },
      tests : {
        files : ["test/spec/*.spec.js"],
        tasks : ["jshint", "jasmine"]
      }
    }
  });
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-jasmine");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.registerTask("build", ["jshint", "uglify"]);
  grunt.registerTask("test", ["jasmine"]);
};