 // Check the value of extensionEnabled before executing the script logic
chrome.storage.sync.get('extensionEnabled', function(result) {
    var enabled = result.extensionEnabled;
    if (enabled) {
        executeScriptLogic();
    } else {
        console.log('Extension is disabled. Content script not executed.');
    }
});
 
  // Find the input elements
  var inputElementWood = document.querySelector('input[name="buy_wood"].premium-exchange-input');
  var inputElementStone = document.querySelector('input[name="buy_stone"].premium-exchange-input');
  var inputElementIron = document.querySelector('input[name="buy_iron"].premium-exchange-input');

  // Find the <td> elements with the stock values
  var stockElementWood = document.getElementById('premium_exchange_stock_wood');
  var stockElementStone = document.getElementById('premium_exchange_stock_stone');
  var stockElementIron = document.getElementById('premium_exchange_stock_iron');


	// Empty all input fields when any input field is focused
	function emptyInputFields() {
		inputElementWood.value = "";
		inputElementStone.value = "";
		inputElementIron.value = "";
	}

	// Function to check if any of the input elements has focus
	function hasFocusOnInputs() {
		return document.activeElement === inputElementWood ||
			   document.activeElement === inputElementStone ||
			   document.activeElement === inputElementIron;
	}

	// Function to update inputElementWood.value with stockValue
	function updateInputElement(keyValue,inputElement,stockElement, unitsElement) {
			
			if (inputElement && stockElement && document.activeElement === inputElement) {
				// Get the value from the <td> element
				//var stockValue = stockElement.textContent.trim();
				var stockValue =  keyValue;
				//total of stock
				var unitsAvailable = stockElement.textContent;
				console.log('Total stock available: ' + unitsAvailable);
				//get total of units  that can be bought with premium points
				var unitsValue  = unitsElement.unitsValue;
				//get premium point
				var premiumValue  = unitsElement.premiumValue;
				//calculate how much stock I can buy  according to exchange rate. 
				//I am  not interested in buying  leftover. 
				//If with  1  premium  point I can buy 64, then I will  buy  multiple of  64  for stock
				let result = calculateMaxUnitsPurchase(stockValue, premiumValue, unitsValue, unitsAvailable);
				
				//buy everything 
				inputElement.value = result.maxUnitsToBuy !== 0 ? result.maxUnitsToBuy : '';
				
				
				
			}
	}

	function extractDivValues(tdId) {
		// Get the td element by its id
		var tdElement = document.getElementById(tdId);;
	
		// Variables to hold extracted values
		var unitsValue;
		var premiumValue;
	
		// Check if the element is found
		if (tdElement) {
			// Get all div elements inside the td element
			var divElements = tdElement.querySelectorAll('div');
	
			// Loop through each div element and extract its text content
			divElements.forEach(function(div, index) {
				// Extract content only from the first and third div elements
				if (index === 0) {
					unitsValue = div.textContent.trim();
				} else if (index === 2) {
					premiumValue = div.textContent.trim();
				}
			});
	
			// Return the extracted values
			return { unitsValue: unitsValue, premiumValue: premiumValue };
		} else {
			console.log("Element with id '" + tdId + "' not found.");
			return null;
		}
	}

		
	// Function to check and update the input value
	function checkAndUpdate() {

		emptyInputFields();
		

		//get wood
		var getUnitsWood = extractDivValues('premium_exchange_rate_wood');
		//get  stone
		var getUnitsStone = extractDivValues('premium_exchange_rate_stone');
		//get  iron
		var getUnitsIron = extractDivValues('premium_exchange_rate_iron');
	


		// Retrieve stored value for 'refreshValue' from Chrome storage
		chrome.storage.sync.get(['exchangeWoodValue', 'exchangeStoneValue', 'exchangeIronValue'], (result) => {
			// Update inputElementWood value
			updateInputElement(result.exchangeWoodValue,inputElementWood, stockElementWood, getUnitsWood);
			// Update inputElementStone value
			updateInputElement(result.exchangeStoneValue,inputElementStone, stockElementStone, getUnitsStone);
			// Update inputElementIron value
			updateInputElement(result.exchangeIronValue,inputElementIron, stockElementIron, getUnitsIron);
		});




			// Send the values to the popup script
			
			chrome.runtime.sendMessage({
				exchangeWood: getUnitsWood,
				exchangeStone: getUnitsStone,
				exchangeIron: getUnitsIron
			});

		
	}

 
function executeScriptLogic() {

    // Add focus event listeners to all input fields
    inputElementWood.addEventListener('click', checkAndUpdate);
    inputElementStone.addEventListener('click', checkAndUpdate);
    inputElementIron.addEventListener('click', checkAndUpdate);

	// Options for the observer (which mutations to observe)
	var observerConfig = { subtree: true, characterData: true, childList: true };

	// Create a MutationObserver instance
	var observer = new MutationObserver(checkAndUpdate);

	// Add event listeners to enable and disable observer when any of the three inputs are focused or blurred
	inputElementWood.addEventListener('focus', function() {
		observer.observe(stockElementWood, observerConfig);
	});
	inputElementStone.addEventListener('focus', function() {
		observer.observe(stockElementStone, observerConfig);
	});
	inputElementIron.addEventListener('focus', function() {
		observer.observe(stockElementIron, observerConfig);
	});
	
	document.querySelectorAll('input[name="buy_wood"].premium-exchange-input, input[name="buy_stone"].premium-exchange-input, input[name="buy_iron"].premium-exchange-input').forEach(function(input) {
		input.addEventListener('blur', function() {
			observer.disconnect();
		});
	});
	
	// Add event listeners to enable and disable observer when any key is pressed
	document.addEventListener('keydown', function(event) {
		// Disconnect the observer when any key is pressed
		observer.disconnect();
	});
	
	//#region  set  reload page time
	// Initial setup
	var reloadInterval = null;


	// Retrieve switch status from Chrome storage
	chrome.storage.sync.get(['disableStockRefreshChecked','refreshValue'], function(result) {
		var isChecked = result.disableStockRefreshChecked;
		var refreshValue = result.refreshValue;
		// Execute handleSwitchStatusChange only if refreshValue is defined
		if (refreshValue !== undefined) {
            handleSwitchStatusChange(isChecked, reloadInterval, hasFocusOnInputs);
        }
	});

	// Listen for changes in disableStockRefreshChecked value
	chrome.storage.onChanged.addListener(function(changes, namespace) {
		if (changes.disableStockRefreshChecked) {
			var isChecked = changes.disableStockRefreshChecked.newValue;
			handleSwitchStatusChange(isChecked,reloadInterval, hasFocusOnInputs);
		}
	});
	//#endregion  set reload page time

}

// Function to handle changes in disableStockRefreshChecked value
function handleSwitchStatusChange(isChecked, reloadInterval, focusCheckFunction ) {
		if (isChecked === true) {
			console.log('disableStockRefreshChecked: true');
			// Retrieve refresh value from Chrome storage
			chrome.storage.sync.get('refreshValue', function(result) {
				var refreshValue = result.refreshValue;
				// Convert refresh value to milliseconds (assuming it's in seconds)
				var interval = refreshValue;
	
				// Start the interval only if it's not already running
				if (!reloadInterval) {
					reloadInterval = setInterval(function() {
						if (!focusCheckFunction()) {
							//reload page
							location.reload();
						}
					}, interval);
				}
			});
		} else {
			console.log('disableStockRefreshChecked: false');
			// Stop the interval if it's running
			if (reloadInterval) {
				clearInterval(reloadInterval);
				reloadInterval = null;
			}
		}
}


function calculateMaxUnitsPurchase(totalUnits, cost, unitsValue, unitsAvailable) {
	//cost per unit in premium points. 1 premium point for 64 units
	var costPerUnit = cost / unitsValue; 

	//adjust for availability
	var totalUnitsCanBuy = Math.min(totalUnits,unitsAvailable);

    // Calculate the total cost
    let totalCost = costPerUnit * totalUnitsCanBuy;

    // Calculate the maximum number of units you can buy
    let maxUnitsToBuy = Math.floor(totalCost);

    // Calculate the leftover amount
    let leftoverAmount = totalCost - maxUnitsToBuy;

	let  totalMaxUnitsToBuy  =  maxUnitsToBuy *  unitsValue;
	
	//load the available stock if units to buy equals zero
	if(totalMaxUnitsToBuy == 0){
		totalMaxUnitsToBuy = unitsAvailable;
	}

    return {
        maxUnitsToBuy: totalMaxUnitsToBuy,
        leftoverAmount: leftoverAmount.toFixed(2),
    };
}
