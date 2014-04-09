$('document').ready(function() {
  var $timer_containers_wrapper;
  app = {
    // function_name : function(){},
    start : function() {
      $timer_containers_wrapper = $('#containers-wrapper');
      app.add_container_button();
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
        $(this)[0].onmousedown = function() {
            this.focus();
        };
      });
    },

    select_container : function(elem) {
      app.stop_all_timers();
      app.deactivate_all_containers();
      $(elem).addClass('active')
      elem.find('.timer').runner('start');
    },

    set_default_title : function(count, $titles) {
      var new_temp_title = 'Untitled ' + count;
      $titles.eq(count - 1).text(new_temp_title);
    },

    add_new_timer : function(count, $timers) {
      $new_timer = $timers.eq(count - 1);
      $new_timer.runner();
      $new_timer_container = $new_timer.parent();
      app.select_container($new_timer_container);
      // Make containers clickable for starting timers.
      $new_timer_container.click(function(e) {
      console.log($(this));
      $(this).css('border', '1px solid red');
        app.select_container($(this));
      });
    },

    stop_all_timers : function() {
      var $timers = $('.timer-container .timer');
      // Stop running timers
      $timers.each(function() {
        $(this).runner('stop');
      });
    },

    deactivate_all_containers : function() {
      var $containers = $('.timer-container');
      $containers.each(function() {
        $(this).removeClass('active');
      });
    }
  }

  // Startup routine
  app.start();
});


// Make timer run when container 'selected'.

// Reset all timers button.

// Reset timer button in container.

// Clear all button.

// Delete container button in container.

// make it all persistent via local storage.

// Theme app.

// Make title behave properly when you click on it. (selection, cursor placement, etc)