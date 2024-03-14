// When the document is ready, perform the following actions
$(document).ready(function() {
  // Load the 'depozitPremium.html' page into the 'contentNavigation' element
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

// Function to initialize stock page settings
function initializeDepozitSettings() {
  // Retrieve DOM elements
  var disableStockRefreshCheckbox = document.getElementById('disableStockRefresh');
  var refreshTimeInput = document.getElementById('refreshStockInput');
  var getExchangeWoodValue = document.getElementById('exchangeWoodInput');
  var getExchangeStoneValue = document.getElementById('exchangeStoneInput');
  var getExchangeIronValue = document.getElementById('exchangeIronInput');

  // Retrieve stored value for 'disableStockRefreshChecked' from Chrome storage
  chrome.storage.sync.get('disableStockRefreshChecked', (result) => {
    var isChecked = result.disableStockRefreshChecked;
   
    // Update checkbox state if found, otherwise display an alert
    if (disableStockRefreshCheckbox) {
      disableStockRefreshCheckbox.checked = isChecked;
      // Enable or disable the input based on the checkbox state
      refreshTimeInput.disabled = !isChecked;

    } else {
      alert("Element with ID 'disableStockRefresh' not found.");
    }
  });

  //update refresh timer on page load
  setMinimumRefreshValue(refreshTimeInput);
  //Update stock value in  page load
  UpdateUIResources();
  //initialize  inputs on page load
  setExchangeValues(getExchangeWoodValue,getExchangeStoneValue,getExchangeIronValue);


}

function UpdateUIResources(){
  // Retrieve the stored values from chrome.storage.sync
    chrome.storage.sync.get(['exchangeWood', 'exchangeStone', 'exchangeIron'], function(result) {
        var getUnitsWood = result.exchangeWood;
        var getUnitsStone = result.exchangeStone;
        var getUnitsIron = result.exchangeIron;

        // Check if the values are retrieved successfully
        if (getUnitsWood !== undefined && getUnitsStone !== undefined && getUnitsIron !== undefined) {
            // Update the popup UI with the retrieved values
            updateUI(
                getUnitsWood.unitsValue,getUnitsWood.premiumValue, 
                getUnitsStone.unitsValue,getUnitsStone.premiumValue,
                getUnitsIron.unitsValue,getUnitsIron.premiumValue);
        } else {
            console.error("Failed to retrieve values from chrome.storage.sync.");
        }
    });
} 

// Function to update the UI with the received values
function updateUI(woodUnitValue, woodPointValue, stoneUnitValue, stonePointValue, ironUnitValue, ironPointValue) {
  // Update the values of woodUnitValue, woodPointValue, stoneUnitValue, stonePointValue, ironUnitValue, and ironPointValue in the UI
  document.getElementById('woodUnitValue').innerText = woodUnitValue;
  document.getElementById('woodPointValue').innerText = woodPointValue;
  document.getElementById('stoneUnitValue').innerText = stoneUnitValue;
  document.getElementById('stonePointValue').innerText = stonePointValue;
  document.getElementById('ironUnitValue').innerText = ironUnitValue;
  document.getElementById('ironPointValue').innerText = ironPointValue;
}



function setMinimumRefreshValue(refreshTimeInput) {
  const minimumRefreshValue = 700;

  // Retrieve stored value for 'refreshValue' from Chrome storage
  chrome.storage.sync.get('refreshValue', (result) => {
    refreshTimeInput.value = setValueOrSetDefault('refreshValue',result.refreshValue,minimumRefreshValue);
  });


  setInputFilter(refreshTimeInput);

  setInputChangeListener('refreshValue',refreshTimeInput,  minimumRefreshValue, minimumRefreshValue);



}

//set exhange inputs
function setExchangeValues(exchangeWoodValue,exchangeStoneValue,exchangeIronValue){

  const defaultMaxValue  = 10000;

  //initialize  inputs on page load
  exchangeWoodValue.value = defaultMaxValue;
  exchangeStoneValue.value = defaultMaxValue;
  exchangeIronValue.value = defaultMaxValue;

  var [defaultWoodMinValue,defaultStoneMinValue,defaultIronMinValue]  = [0, 0, 0];

  
    // Retrieve stored value for 'refreshValue' from Chrome storage
    chrome.storage.sync.get(['exchangeWoodValue', 'exchangeStoneValue', 'exchangeIronValue'], (result) => {
      exchangeWoodValue.value = setValueOrSetDefault('exchangeWoodValue', result.exchangeWoodValue, defaultMaxValue); 
      exchangeStoneValue.value = setValueOrSetDefault('exchangeStoneValue', result.exchangeStoneValue, defaultMaxValue);
      exchangeIronValue.value = setValueOrSetDefault('exchangeIronValue', result.exchangeIronValue, defaultMaxValue);
  });
  
    setInputFilter(exchangeWoodValue);
    setInputFilter(exchangeStoneValue);
    setInputFilter(exchangeIronValue);

  // Retrieve the stored values from chrome.storage.sync
  chrome.storage.sync.get(['exchangeWood', 'exchangeStone', 'exchangeIron'], function(result) {
    var getUnitsWood = result.exchangeWood;
    var getUnitsStone = result.exchangeStone;
    var getUnitsIron = result.exchangeIron;

  
    // Check if the values are retrieved successfully
    // Get minimum values  from the stock market to initialize  inputs  later if inserter value is below  stock value
    if (getUnitsWood !== undefined && getUnitsStone !== undefined && getUnitsIron !== undefined) {
        
        defaultWoodMinValue = getUnitsWood.unitsValue;
        defaultStoneMinValue = getUnitsStone.unitsValue;
        defaultIronMinValue = getUnitsIron.unitsValue;
  
        setInputChangeListener('exchangeWoodValue',exchangeWoodValue, defaultWoodMinValue, defaultMaxValue);
        setInputChangeListener('exchangeStoneValue',exchangeStoneValue, defaultStoneMinValue, defaultMaxValue);
        setInputChangeListener('exchangeIronValue',exchangeIronValue, defaultIronMinValue, defaultMaxValue);

    } else {
        console.error("Failed to retrieve  wood, stone, iron values from chrome.storage.sync in pageNavigation.js.");
    }
  });



}

const setValueOrSetDefault = (key, value, defaultValue) => {
  if (!value) {
      chrome.storage.sync.set({ [key]: defaultValue });   
  }
  else if(isNaN(value)){
      chrome.storage.sync.set({ [key]: defaultValue });  
  } 
  else {

      return value;
  }
};

function setInputFilter(inputElement) {
  inputElement.addEventListener('input', (event) => {
      event.target.value = event.target.value.replace(/\D/g, '');
  });
}


function setInputChangeListener(key, inputElement, minValue, defaultValue) {
  inputElement.addEventListener('change', (event) => {
      const inputValue = parseInt(event.target.value, 10);
       // Ensure minimum value
       if (inputValue < minValue) {
        event.target.value = minValue;
      } else if (isNaN(inputValue)) {
        event.target.value = defaultValue;
      }

      // Store the value in Chrome storage
    chrome.storage.sync.set({ [key]: event.target.value });

  });
}
