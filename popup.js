// Comment: Functionality to disable the extension
document.addEventListener('DOMContentLoaded', function() {

  var toggleButton = document.getElementById('disableButton');

  // Event listener for toggle button click
  toggleButton.addEventListener('click', function() {
    // Get the current state of the extension
    chrome.storage.sync.get('extensionEnabled', function(result) {
      // Toggle the enabled state
      var enabled = !result.extensionEnabled;
      // Save the updated state
      chrome.storage.sync.set({ extensionEnabled: enabled }, function() {
        // Update the extension icon based on the new state
        updateIcon(enabled);  
      });
    });
  });


  // Call updateIcon() initially to set the icon based on the current storage value
  chrome.storage.sync.get('extensionEnabled', function(result) {
    var enabled = result.extensionEnabled;
    // Update icon and toggle button state based on storage value
    if (enabled === true) {
      updateIcon(true);
      toggleButton.checked =  enabled;
    } else {   
      updateIcon(false); 
      toggleButton.checked =  false;   
    }
   
  });

});

  // Function to update the extension icon
function updateIcon(enabled) {
    var iconPath;
    // Set icon path based on the state
    if (enabled) {
      iconPath = {
        "16": "icon_enabled.png"
      };
    } else {
      iconPath = {
        "16": "icon_disabled.png"
      };
    }
    // Set the icon
    chrome.action.setIcon({ path: iconPath });
}
