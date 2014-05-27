var add_container_button_html = {"html":"<form id='add-container-form' class='button-form'><button id='add-container-button' value='add' type='button'>+ add</button></form>"}

var global_stop_button_html = {"html":"<form id='global-stop-form' class='button-form'><button id='global-stop-button' value='stop' type='button'>x stop</button></form>"}

var container_html = {"html":"<li class='timer-container'><div class='delete button'>x</div><div class='title' contenteditable='true'></div><div class='timer'></div></li>"}

var confirm_dialog_html = {"html":"<div id='dialog-confirm' class='dialog-confirm' title='Delete this timer?'> <span class='ui-icon ui-icon-alert' style='float:left; margin:0 7px 20px 0;'></span>Are you sure?</div>"}

var help_html = {"html":"<div id='help-text' class='help-text' title='About this app'><p>Task Timer is a tool for people who need to keep track of the time they spend on daily tasks.</p><p>It is specifically designed with context switching in mind, so that it is easy to switch the timer from one task to another with a minimum of fuss.</p><h2>How to use</h2><ol><li>Add a timer</li><li>Click to change the title of your timer.</li><li>Repeat for as many timers as you need.</li><li>Drag them about to put them in an order that makes sense to you.</li><li>Simply click on a timer to activate it.</li><li>The stop button stops all timers.</li><li>A timer can be deleted at any point.</li></ol><h2>Known Issues</h2><p>This project is still enjoying ongoing development so the javascript does still need to be optimised and minified.</p><p>The timers are not yet persistent, so reloading the page will clear all timers.</p><p>The tab title does not yet change to reflect a newly named timer, until the timer is deselected and reselected.</p></div>",
  "button": "<div id='help-button' class='help-button'>Help</div>"
}
