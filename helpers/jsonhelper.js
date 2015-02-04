'use strict';

/**
 * {{{json}}} - outputs the json contents of an object instead of its .toString
 *
 * Thanks to this post for inspiration:
 * http://stackoverflow.com/questions/10232574/handlebars-js-parse-object-instead-of-object-object
 *
 * @param  {Object} `object` The JSON object.
 * @return {String} Returns json string.
 * @xample: {{{json mydata}}}
 */

module.exports.register = function (Handlebars, options, params) {
  Handlebars.registerHelper('json', function(context) {
      return JSON.stringify(context);
  });
};
