// When the document is ready, perform the following actions
$(document).ready(function() {
  // Load the 'premiumStock.html' page into the 'contentNavigation' element
  loadPage('pages/premiumStock.html', 'contentNavigation');
  // Initialize deposit settings after a delay of 100 milliseconds
  setTimeout(initializeDepozitSettings, 100); //time in ms


 // Function to handle navigation link clicks
function handleNavigationClick(linkId, pageUrl, callback) {
  // Add event listener for the link
  $(linkId).on('click', function(event) {
    event.preventDefault(); // Prevent default anchor behavior
    // Load the specified page into the 'contentNavigation' element
    loadPage(pageUrl, 'contentNavigation');
    // Initialize settings after a delay of 200 milliseconds
    setTimeout(callback, 50); //time in ms
    
    // Remove the 'active' class from all links within the same parent container
    $(this).closest('ul').find('a').removeClass('active');
    // Add the 'active' class to the clicked link
    $(this).addClass('active');
  });
}

// Call the function for the 'Stock' link
handleNavigationClick('#stockLink', 'pages/premiumStock.html', initializeDepozitSettings);

// Call the function for the 'Planner' link
handleNavigationClick('#junkLink', 'pages/junk.html', function() {});

});







