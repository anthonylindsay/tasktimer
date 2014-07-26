var add_container_button_html = {"html":"<form id='add-container-form' class='button-form'><button id='add-container-button' value='add' type='button' title='Add a new timer'>+ add</button></form>"}

var global_stop_button_html = {"html":"<form id='global-stop-form' class='button-form'><button id='global-stop-button' value='stop' type='button' title='Stop all timers.'>x stop</button></form>"}

var global_clear_button_html = {"html":"<form id='global-clear-form' class='button-form'><button id='global-clear-button' value='clear' type='button' title='Clear all timers and remove from memory.'>- clear</button></form>"}

var container_html = {"html":"<li class='timer-container'><div class='delete button'>x</div><div class='merge button'>&#x29C9;</div><div class='edit button'>&plusmn;</div><div class='title' contenteditable='true'></div><div class='timer'></div></li>"}

var confirm_dialog_html = {"html":"<div id='dialog-confirm' class='dialog-confirm' title='Delete this timer?'> <span class='ui-icon ui-icon-alert' style='float:left; margin:0 7px 20px 0;'></span>Are you sure?</div>"}

var edit_dialog_html = {"html":"<div id='dialog-edit' class='dialog-edit' title='Shift time'> <form><label>Minutes</label><input type='number' id='amount' value='15' class='number ui-widget-content ui-corner-all'><input type='submit' tabindex='-1' style='position:absolute; top:-1000px'></form></div>"}

var confirm_dialog_all_html = {"html":"<div id='dialog-confirm-all' class='dialog-confirm' title='Delete all timers?'> <span class='ui-icon ui-icon-alert' style='float:left; margin:0 7px 20px 0;'></span>Are you sure?</div>"}

var help_html = {"html":"<div id='help-text' class='help-text' title='About this app'><p>Task Timer is a tool for people who need to keep track of the time they spend on daily tasks.</p><p>It is specifically designed with context switching in mind, so that it is easy to switch the timer from one task to another with a minimum of fuss.</p><h2>How to use</h2><ol><li>Add a timer</li><li>Click to change the title of your timer.</li><li>Repeat for as many timers as you need.</li><li>Drag them about to put them in an order that makes sense to you.</li><li>Simply click on a timer to activate it.</li><li>The stop button stops all timers.</li><li>A timer can be deleted at any point.</li><li>Use the timer tools to merge timers and/or shift time from one to another.</li></ol><h2>Known Issues</h2><p>This project is still enjoying ongoing development so the javascript does still need to be optimised and minified.</p><p><a href='https://github.com/anthonylindsay/tasktimer'>See the source code on Github.</a></p></div>",
  "button": "<div id='help-button' class='help-button'>Help</div>"
}

var global_total_button_html = {"html":"<form id='global-total-form' class='button-form'><button id='global-total-button' value='sum' type='button' title='Update the total value of all timers.'>&sum; sum</button></form>"}