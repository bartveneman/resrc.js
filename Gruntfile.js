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
      all : ["<%=srcPath%>"]
    },
    uglify : {
      options : {
        banner : grunt.file.read("header.txt"),
        compress: {
          drop_console: true
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
      }
    }
  });
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.registerTask("build", ["jshint", "uglify"]);
};