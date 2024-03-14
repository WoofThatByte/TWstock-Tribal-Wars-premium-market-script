
document.addEventListener('DOMContentLoaded', function() {
    // Get a reference to a parent element that exists in the DOM when the page loads
    var contentNavigation = document.getElementById('contentNavigation');
    var navigationBar = document.getElementById('stockLink');
  
    // Add event listener to the parent element
    //check if depozitPremium.html has been clicked. I know user interacts with the controls
    contentNavigation.addEventListener('click', function(event) {
        
        var target = event.target;
        // Check if the clicked element is the switch label
        //I know  page has  been loaded when  click  in the  navigation bar
        if (target && target.id === 'disableStockRefresh') {
            // Get a reference to the checkbox and text input elements
            var disableStockRefreshCheckbox = document.getElementById('disableStockRefresh');
            var refreshTimeInput = document.getElementById('refreshStockInput');
      
            // Toggle the disabled state of the text input
            // Add event listener to the checkbox
            disableStockRefreshCheckbox.addEventListener('change', function() {
                // Check if the checkbox is checked
                var isChecked = disableStockRefreshCheckbox.checked;
            
                // Update the stored value
                //chrome.storage.sync.set({ 'disableStockRefreshChecked': isChecked });

                 // Send message to background script with the new status
                chrome.runtime.sendMessage({ 'disableStockRefreshChecked': isChecked });

                // Enable or disable the input
                refreshTimeInput.disabled = !isChecked;
            });   
        }
             
    });



   


});




