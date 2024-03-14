// Listen for messages from stockPage.js
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.disableStockRefreshChecked !== undefined) {
        // Store switch status in Chrome storage
        chrome.storage.sync.set({ 'disableStockRefreshChecked': message.disableStockRefreshChecked });
        console.log('disable timer button: ' + message.disableStockRefreshChecked);
    }
    else{
        console.log('disable timer button - message undefined');
    }
});

//listen for stock exchange values
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // Check if the message contains the value for exchangeWood
    if (message.exchangeWood !== undefined) {
        // Save exchangeWood to chrome.storage.sync
        chrome.storage.sync.set({ exchangeWood: message.exchangeWood }, function() {
            if (chrome.runtime.lastError) {
                console.error("Error saving exchangeWood to chrome.storage.sync:", chrome.runtime.lastError);
            } else {
                console.log("exchangeWood saved to chrome.storage.sync successfully.");
            }
        });
    }

    // Check if the message contains the value for exchangeStone
    if (message.exchangeStone !== undefined) {
        // Save exchangeStone to chrome.storage.sync
        chrome.storage.sync.set({ exchangeStone: message.exchangeStone }, function() {
            if (chrome.runtime.lastError) {
                console.error("Error saving exchangeStone to chrome.storage.sync:", chrome.runtime.lastError);
            } else {
                console.log("exchangeStone saved to chrome.storage.sync successfully.");
            }
        });
    }

    // Check if the message contains the value for exchangeIron
    if (message.exchangeIron !== undefined) {
        // Save exchangeIron to chrome.storage.sync
        chrome.storage.sync.set({ exchangeIron: message.exchangeIron }, function() {
            if (chrome.runtime.lastError) {
                console.error("Error saving exchangeIron to chrome.storage.sync:", chrome.runtime.lastError);
            } else {
                console.log("exchangeIron saved to chrome.storage.sync successfully.");
            }
        });
    }
});
