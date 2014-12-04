/*
 * descriptor-editor
 *
 * Ryan Pavlik
 * https://github.com/sensics/descriptor-editor
 *
 * Copyright (c) 2014
 * Licensed under the Apache-2.0 license.
 */

module.exports = function(grunt) {
'use strict';

  // Project configuration.
  grunt.initConfig({

    // Project metadata
    pkg   : grunt.file.readJSON('package.json'),
    vendor: grunt.file.readJSON('.bowerrc').directory,
    site  : grunt.file.readYAML('_config.yml'),
    bootstrap: '<%= vendor %>/bootstrap',


    // Before generating any new files, remove files from previous build.
    clean: {
      example: ['<%= site.dest %>/*.html'],
    },


    // Lint JavaScript
    jshint: {
      all: ['Gruntfile.js', 'templates/helpers/*.js', '<%= site.schemas %>/*.json'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Bower install
    bower: {
      install: {
        options: {
          targetDir: '<%= vendor %>'
        }
      }
    },


    // Build HTML from templates and data
    assemble: {
      options: {
        flatten: true,
        production: false,
        assets: '<%= site.assets %>',
        postprocess: require('pretty'),

        // Metadata
        pkg: '<%= pkg %>',
        site: '<%= site %>',
        data: ['<%= site.data %>'],

        // Templates
        partials: '<%= site.includes %>',
        layoutdir: '<%= site.layouts %>',
        layout: '<%= site.layout %>',

        // Extensions
        helpers: '<%= site.helpers %>',
        plugins: '<%= site.plugins %>'
      },
      editor: {
        files: {'<%= site.dest %>/': ['<%= site.content %>/*.hbs']}
      }
    },


    // Compile LESS to CSS
    less: {
      options: {
        vendor: 'vendor',
        paths: [
          '<%= site.theme %>',
          '<%= site.theme %>/bootstrap',
          '<%= site.theme %>/components',
          '<%= site.theme %>/utils'
        ],
      },
      site: {
        src: ['<%= site.theme %>/site.less'],
        dest: '<%= site.assets %>/css/site.css'
      }
    },


    // Copy Bootstrap's assets to site assets
    copy: {
      // Keep this target as a getting started point
      assets: {
        files: [
          {expand: true, cwd: '<%= bootstrap %>/dist/fonts',    src: ['*.*'], dest: '<%= site.assets %>/fonts/'},
          {expand: true, cwd: '<%= bootstrap %>/dist/js',       src: ['*.*'], dest: '<%= site.assets %>/js/'},
          {expand: true, cwd: '<%= vendor %>/json-editor/dist', src: ['*.*'], dest: '<%= site.assets %>/js/'},
          {expand: true, cwd: '<%= site.schemas %>',            src: ['*.json'], dest: '<%= site.assets %>/schemas/'},
        ]
      }
    },

    watch: {
      all: {
        files: ['<%= jshint.all %>'],
        tasks: ['jshint', 'nodeunit']
      },
      site: {
        files: ['Gruntfile.js', '<%= less.options.paths %>/*.less', 'templates/**/*.hbs', '<%= site.content %>/*', '<%= site.schemas %>/*'],
        tasks: ['design']
      }
    }
  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-sync-pkg');
  grunt.loadNpmTasks('assemble-less');
  grunt.loadNpmTasks('assemble');

  // Build HTML, compile LESS and watch for changes. You must first run "bower install"
  // or install Bootstrap to the "vendor" directory before running this command.
  grunt.registerTask('design', ['clean', 'assemble', 'copy:assets', 'less:site', 'watch:site']);

  grunt.registerTask('default', ['clean', 'bower', 'jshint', 'copy:assets', 'assemble', 'less', 'sync']);
};