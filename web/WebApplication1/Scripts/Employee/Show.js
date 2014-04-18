define(function (require) {
  var Backbone = require('Backbone');

  // TODO: Add validation handling.
  var FormView = Backbone.View.extend({
    initialize: function () {
      this._submitButton = new Backbone.View({
        el: this.$el.find('button[type="submit"]'),
      });
    },

    events: {
      'submit': '_submitHandler'
    },

    _submitHandler: function () {
      var posting = $.post(this.el.action, this.$el.serialize());
      var that = this;
      posting.done(function (data) {
        alert('sucess');
      })
      .fail(function () {
        alert('failure');
      });
      return false;
    }
  });

  var messagesForm = new FormView({
    el: '#messagesForm'
  });

  var calendarForm = new FormView({
    el: '#calendarForm'
  });

  var taskForm = new FormView({
    el: '#taskForm'
  });

  var importantForm = new FormView({
    el: '#importantForm'
  });
  return;
});