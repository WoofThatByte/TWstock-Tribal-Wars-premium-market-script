document.addEventListener('DOMContentLoaded', function() {

    var contentNavigation = document.getElementById('contentNavigation');
    var navigationBar = document.getElementById('plannerLink');
   
    contentNavigation.addEventListener('click', function(event) {

        ////////////////////////
        //RESOURCES LOST CALCULATOR
        /////////////////////////
        var resourcesLostBtn = document.getElementById('resourcesLostBtn');

          // Initialize input elements
        var unitInputs = {
            'spear': document.getElementById('spearUnitInput'),
            'sword': document.getElementById('swordUnitInput'),
            'axe': document.getElementById('axeUnitInput'),
            'archer': document.getElementById('archerUnitInput'),
            'spy': document.getElementById('spyUnitInput'),
            'light': document.getElementById('lightUnitInput'),
            'marcher': document.getElementById('marcherUnitInput'),
            'heavy': document.getElementById('heavyUnitInput'),
            'ram': document.getElementById('ramUnitInput'),
            'catapult': document.getElementById('catapultUnitInput'),
            'knight': document.getElementById('knightUnitInput'),
            'snob': document.getElementById('snobUnitInput')
        };

        // Initialize resource values
        var unitResourceValues = {
            'spear': [50, 30, 10],
            'sword': [30, 30, 70],
            'axe': [60, 30, 40],
            'archer': [100, 30, 60],
            'spy': [50, 50, 20],
            'light': [125, 100, 250],
            'marcher': [250, 100, 150],
            'heavy': [200, 150, 600],
            'ram': [300, 200, 200],
            'catapult': [320, 400, 100],
            'knight': [20, 20, 40],
            'snob': [40000, 50000, 50000]
        };

        var totalWoodLostvalue = document.getElementById('totalWoodLostvalue');
        var totalStoneLostvalue = document.getElementById('totalStoneLostvalue');
        var totalIronLostvalue = document.getElementById('totalIronLostvalue');


        // Add input filter to all unit inputs
        Object.values(unitInputs).forEach(setInputFilter);

        //check if button is clicked
        resourcesLostBtn.addEventListener('click', function(event) {

            var totalWood = 0, totalStone = 0, totalIron = 0;
            
           // Calculate total resource values
            Object.keys(unitInputs).forEach(function(unitType) {
                var inputValue = unitInputs[unitType].value;
                var resourceValues = unitResourceValues[unitType];
                totalWood += resourceValues[0] * inputValue;
                totalStone += resourceValues[1] * inputValue;
                totalIron += resourceValues[2] * inputValue;
            });

          // Update total resource elements
          totalWoodLostvalue.innerText = totalWood;
          totalStoneLostvalue.innerText = totalStone;
          totalIronLostvalue.innerText = totalIron;

        });
        ////////////////////////
        ////////////////////////
        ////////////////////////

        ////////////////////////
        //BACKSTAB TIME  CALCULATOR
        /////////////////////////
        // Get the input values
        var backstabTimeBtn = document.getElementById('calculateTotalBackstabTimeBtn');
        var backstabStartTime = document.getElementById('backstabStartTime');
        setInputTimeFilter(backstabStartTime);
        var backstabEndTime = document.getElementById('backstabEndTime');
        setInputTimeFilter(backstabEndTime);
        var backstabTotalTime = document.getElementById('backstabResultTime');

         //check if button is clicked
         backstabTimeBtn.addEventListener('click', function(event) {

             // Validate input format
        if (!isValidTimeFormat(backstabStartTime.value) || !isValidTimeFormat(backstabEndTime.value)) {
            console.log("Invalid time format. Please use format 'hh:mm:ss.ms'");
            backstabTotalTime.value =  'invalid format';
            backstabTotalTime.style.borderColor = 'red';
            return;
        }
        else{
            backstabTotalTime.style.borderColor = '';

            // Convert start time and end time to milliseconds
            var startTimeMs = timeStringToMilliseconds(backstabStartTime.value);
            var endTimeMs = timeStringToMilliseconds(backstabEndTime.value);

            // Calculate the total time in milliseconds
            var totalTimeMs = startTimeMs + endTimeMs;
                
            // Convert total time back to hh:mm:ss.ms format
            var resultTime = millisecondsToTimeString(totalTimeMs);

            // Display the result in the backstabResultTime field
            backstabTotalTime.value = resultTime;
        }
            
         });
        ////////////////////////
        ////////////////////////
        ////////////////////////
        ////////////////////////
        //AUTOSPLIT TIME  CALCULATOR
        /////////////////////////
        // Get the input values
        var autosplitTimeBtn = document.getElementById('calculateAutosplitTimeBtn');
        var autosplitTime = document.getElementById('autosplitTime');
        setAutosplitInputTimeFilter(autosplitTime);
        var autosplitResultTime = document.getElementById('autosplitResultTime');

        //check if button is clicked
        autosplitTimeBtn.addEventListener('click', function(event) {

            // Validate input format
            if (!isValidTimeAutosplitFormat(autosplitTime.value)) {
                console.log("Invalid time format. Please use format 'm:ss'");
                autosplitResultTime.value =  'invalid format';
                autosplitResultTime.style.borderColor = 'red';
                return;
            }
            else{
                autosplitResultTime.style.borderColor = '';
                var dividedTime = divideTimeByTwo(autosplitTime.value);
                autosplitResultTime.value =  dividedTime;
            }

        });
        ////////////////////////
        ////////////////////////
        ////////////////////////
    });

});


function setInputFilter() {
    inputElement.addEventListener('input', (event) => {
        event.target.value = event.target.value.replace(/\D/g, '');
    });
}

  //allow time value
  function setInputTimeFilter(inputElement) {
    inputElement.addEventListener('input', (event) => {     
        var regex = /^(?:[0-1]?[0-9]|2[0-3])?(?::[0-5]?[0-9]?)?(?::[0-5]?[0-9]?)?(\.\d{0,3})?$/;
        var inputValue = event.target.value;
        if (!regex.test(inputValue)) {
            event.target.value = ''; // Clear input if it doesn't match the time format
        }
    });
}

    //allow time value
function setAutosplitInputTimeFilter(inputElement) {
    inputElement.addEventListener('input', (event) => {     
        var regex = /^(?:[0-9]?(?::(?:[0-5]?[0-9])?)?)?$/; // Regular expression to allow up to 9 minutes and 59 seconds       
        var inputValue = event.target.value;
        if (!regex.test(inputValue)) {
            event.target.value = ''; // Clear input if it doesn't match the time format
        }
    });
}


function isValidTimeFormat(timeString) {
    var regex = /^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]).([0-9]{3})$/;
    return regex.test(timeString);
}

function isValidTimeAutosplitFormat(timeString) {
    var regex = /^(([0-9]):([0-5][0-9]))$/;
    return regex.test(timeString);
}

// Function to convert time string to milliseconds
function timeStringToMilliseconds(timeString) {
    var parts = timeString.split(':');
    var hours = parseInt(parts[0], 10);
    var minutes = parseInt(parts[1], 10);
    var secondsAndMilliseconds = parts[2].split('.');
    var seconds = parseInt(secondsAndMilliseconds[0], 10);
    var milliseconds = parseInt(secondsAndMilliseconds[1], 10);
    return hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds;
}

// Function to convert milliseconds to time string
function millisecondsToTimeString(milliseconds) {
    var hours = Math.floor(milliseconds / 3600000);
    var minutes = Math.floor((milliseconds % 3600000) / 60000);
    var seconds = Math.floor((milliseconds % 60000) / 1000);
    var millisecondsRemaining = milliseconds % 1000;
    return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2) + '.' + pad(millisecondsRemaining, 3);
}

// Function to pad numbers with leading zeros
function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

function divideTimeByTwo(inputTime) {
      // Split the input time into hours and minutes
    var [minutes, seconds] = inputTime.split(':');

    // Convert hours and minutes to numbers
    var totalMinutes = parseInt(minutes) * 60 + parseInt(seconds);

    // Divide total minutes by 2
    var dividedSeconds = totalMinutes / 2;

    // Calculate the new hours and minutes
    var newMinutes = Math.floor(dividedSeconds / 60);
    var newSeconds = Math.floor(dividedSeconds % 60);

    // Format the new time
    var newTime = newMinutes.toString().padStart(2, '0') + ':' + newSeconds.toString().padStart(2, '0');

    return newTime;
}




