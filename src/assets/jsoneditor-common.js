'use strict';

// Copyright 2014, 2015 Sensics, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

;(function(root, init) {
  init(root, root.jQuery, root.OSVRJSON = root.OSVRJSON || {});
})(this, function(root, $, my) {
  var console = root.console,
    JSONEditor = root.JSONEditor,
    document = root.document;
  // Call with the options object (primarily including the schema), as well
  // as a function that will receive the editor object.
  my.createEditor = function(options, fn) {
    $(document).ready(function() {
      // Set the default CSS theme and icon library globally
      JSONEditor.defaults.theme = 'bootstrap3';
      JSONEditor.defaults.iconlib = 'bootstrap3';

      // Create the editor
      my.editor = new root.JSONEditor(document.getElementById('editor_holder'), options);

      /// Pass editor through to function
      fn(my.editor);


      /// Set up file dropping
      root.fd.jQuery($);
      var showDropTarget = function() {
        console.log("Enter");
        $('#file_open').modal('show');
      };

      var hideDropTarget = function() {
        console.log("Done with drop target");
        $('#file_open').modal('hide');
      };

      $('body')
        .filedrop({
          input: false // Set up an HTML5-only dropzone
        })
        .on('fddragenter', function(e) {
          showDropTarget();
        })
        .on('fddragleave', function(e) {
          hideDropTarget();
        })
        .on('fdsend', function(e, files) {
          $.each(files, function(i, file) {
            file.readData(function(str) {
                my.editor.setValue(JSON.parse(str));
                my.editor.filename = file.name;
                console.log("Loaded " + file.name);
              },
              function() {
                root.alert('Problem reading this file.');
              },
              'text'
            );
          });
          hideDropTarget();
        });

      $('#actionSaveFile').click(function() {
        var filename = my.editor.filename || 'descriptor.json';
        var contents = JSON.stringify(my.editor.getValue(), null, '  ');
        console.log("Contents: " + contents);
        var blob = new root.Blob([contents], {type: "application/json;charset=utf-8"});
        root.saveAs(blob, filename);
      });
    });
  };


});
