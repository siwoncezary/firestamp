(function (window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function ListHandler(selector) {
    if (!selector) {
      throw new Error("Brak selektora!");
    }
    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error("Brak elementow w selektorze: " + selector);
    }
  }

  function Row(post, key){
    var $div = $('<div></div>', {
      'data-post':'checkbox',
      'class':'checkbox'
    });
    var $label = $('<label></label>');
    var $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: key
    });
    var content = ' '+post.body + ' '+ post.title+' '+post.author;
    $label.append($checkbox);
    $label.append(content);
    $div.append($label);
    this.$element = $div;
  }

  ListHandler.prototype.addRow = function(post, key){
    var row = new Row(post, key);
    this.$element.append(row.$element);
  }

  App.ListHandler = ListHandler;
  window.App = App;
})(window);
