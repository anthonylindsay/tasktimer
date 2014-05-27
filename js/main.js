$('document').ready(function() {
  // Create some global variables.
  var $timer_containers_wrapper;
  var favicon = new Favico({
    animation:'slide',
    bgColor : '#F14040',
    textColor : '#F14040',
  });
  // All the actual mechanics.
  app = {
    // function_name : function(){},
    start : function() {
      $timer_containers_wrapper = $('#containers-wrapper');
      app.add_global_stop();
      app.add_container_button();
      app.init_confirm_dialog();
      app.add_help_button();
      app.change_page_title('Timer');
    },

    init_confirm_dialog : function() {
      $('#main-content').append(confirm_dialog_html.html);
      $('#dialog-confirm').hide();
    },

    add_help_button : function() {
      $('#main-content').prepend(help_html.button);
      $('#main-content').append(help_html.html);
      $('#help-text').hide();
      $('#help-button').click(function(e) {
        e.preventDefault();
        var dialog_width = window.innerWidth * 0.8;
        $('#help-text').dialog({ width: dialog_width });
      });
    },

    add_container_button : function() {
      $('#main-content').prepend(add_container_button_html.html);
      $('#add-container-button').click(function(e) {
        e.preventDefault();
        app.create_container();
      });
    },

    add_global_stop : function() {
      $('#main-content').prepend(global_stop_button_html.html);
      $('#global-stop-button').click(function(e) {
        e.preventDefault();
        app.stop_all_timers();
        app.deactivate_all_containers();
      });
    },

    create_container : function() {
      // Create a new timer container.
      $timer_containers_wrapper.append(container_html.html);
      // Ensure the containers are sortable.
      // Do it each time to refresh the collection.
      $( "#containers-wrapper" ).sortable();
      // Set up cached collections.
      var $titles = $('.timer-container .title');
      var $containers = $('.timer-container');
      var $timers = $('.timer-container .timer');
      // Stop running timers
      $timers.each(function() {
        $(this).runner('stop');
      });
      // Set up the new container.
      app.set_default_title($titles.length, $titles);
      app.add_new_timer($timers.length, $timers);
      // Ensure the titles are editable.
      $titles.each ( function() {
        $(this)[0].onmousedown = function(e) {
          this.focus();
          $(this).selectText();
          $(this).keypress(function( event ) {
            if (event.which == 13) {
              event.preventDefault();
              app.clear_selection();
              // TODO set page title on setting timer title.
            }
          });
        };
        
        $(this).blur(function() {
          if (window.getSelection) {
            selection = window.getSelection();
            range = document.createRange();
            range.selectNodeContents(this);
            selection.removeAllRanges();
          }
        });
      });
    },

    clear_selection: function() {
      var sel;
      if ( (sel = document.selection) && sel.empty ) {
        sel.empty();
      } 
      else {
        if (window.getSelection) {
          window.getSelection().removeAllRanges();
        }
        var activeEl = document.activeElement;
        if (activeEl) {
          var tagName = activeEl.nodeName.toLowerCase();
          if ( tagName == "textarea" ||
             (tagName == "input" && activeEl.type == "text") ) {
            // Collapse the selection to the end
            activeEl.selectionStart = activeEl.selectionEnd;
          }
        }
      }
    },

    select_container : function(elem) {
      app.stop_all_timers();
      app.deactivate_all_containers();
      $(elem).addClass('active')
      elem.find('.timer').runner('start');
      favicon.badge(1);
      var timer_title = elem.find('.title').text();
      app.change_page_title(timer_title);
    },

    set_default_title : function(count, $titles) {
      var new_temp_title = 'Untitled ' + count;
      $titles.eq(count - 1).text(new_temp_title);
    },

    add_new_timer : function(count, $timers) {
      $new_timer = $timers.eq(count - 1);
      $new_timer.runner({milliseconds : false});
      $new_timer_container = $new_timer.parent();
      app.select_container($new_timer_container);
      // Make containers clickable for starting timers.
      $new_timer_container.click(function(e) {
        app.select_container($(this));
      });
      // Make this containers delete button work.
      $new_timer_container.find('.delete.button').click(function(e) {
        var $target_timer = $(this);
        app.confirm_delete_dialog($target_timer);
      });
    },

    stop_all_timers : function() {
      var $timers = $('.timer-container .timer');
      // Stop running timers
      $timers.each(function() {
        $(this).runner('stop');
      });
      favicon.badge(0);
      app.change_page_title('Stopped');
    },

    deactivate_all_containers : function() {
      var $containers = $('.timer-container');
      $containers.each(function() {
        $(this).removeClass('active');
      });
    },

    confirm_delete_dialog : function($target_timer) {
      $( "#dialog-confirm" ).dialog( {
        resizable: false,
        height: 140,
        modal: true,
        buttons: {
          "Confirm delete": function() {
            $target_timer.parent().remove();
            favicon.badge(0);
            $( this ).dialog( "close" );
          },
          Cancel: function() {
            $( this ).dialog( "close" );
          }
        }
      });
      $('.dialog-confirm').css('height', 'auto');
    },

    change_page_title : function(title) {
      document.title = title;
    }
  }

  // Startup routine
  app.start();
});

/**
 * JQuery plugin to make contenteditable text selectable.
 */
jQuery.fn.selectText = function() {
  var range, selection;
  return this.each(function() {
    if (document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(this);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(this);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });
};


// TODO

// make it all persistent via local storage.

// issue? when you click and drag it does not change the active container.
// need button to clear all timers.
// issue: performance sucks when you try to drag whilst timers are running. (or does it?!)
// maybe need to pause timer on mousedown and restart on mouseup