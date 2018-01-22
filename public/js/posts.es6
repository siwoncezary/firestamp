(
  function(window){
    var App = window.App || {};
    var $ = window.jQuery;
    function FormHandler(selector){
      if (!selector){
        throw new Error("Brak selektora!");
      }
      this.$elementForm = $(selector);
      if (this.$elementForm.length === 0){
        throw new Error("Brak elementow w selektorze: " + selector);
      }
    }

    FormHandler.prototype.addListener = function(fn) {
      this.$elementForm.on('submit', function(event){
        event.preventDefault();
        var data = {};
        $(this).serializeArray().forEach(function(element){
          data[element.name] = element.value;
        });
        fn(data);
      });
    }
    App.FormHandler = FormHandler;
    window.App = App;
  }
)(window);
