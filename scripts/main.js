// first imports.......................
import locationsArray from '../init-locations.js';

// helper functions....................


// event handlers......................

let locationElement = document.getElementById("location");

window.addEventListener('load', main);
locationElement.addEventListener('click', locationHandler);
locationElement.addEventListener('touch', locationHandler);

function main() {
    console.log('Page is fully loaded');
}

let currentlat;
let currentlon;
let error = true;

// getLocation() function is used to collect the current location
async function getLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    }).then(position => {
        return position;
    });
}

//the locationHandler() function checksout the current location and compares it with the 
//init-locations.

async function locationHandler() {
    let locText = await getLocation();
    currentlat = locText.coords.latitude;
    document.getElementById("device-lat").innerHTML = "The Latitude of your device: " + currentlat.toFixed(6);
    currentlon = locText.coords.longitude;
    document.getElementById("device-long").innerHTML = "The Longitude of your device: " + currentlon.toFixed(6);

    locationsArray.forEach(function (value) {
        if (isInside(value.Latitude, value.Longitude)) {
            document.getElementById("locationAnswer").innerHTML = value.Name;
            error = false;
        }
    });

    // In case of any error where if the device is not 30m range it displays error.

    if (error) {
        document.getElementById("error-message").innerHTML = "You're not in the specified area";
    } else{
        document.getElementById("error-message").innerHTML = "";
    }
}


//checking if distance is in 30m range.


function isInside(questLat, questLon) {
    let distance = distanceBetweenLocations(currentlat, currentlon, questLat, questLon);
    console.log("distance: " + distance);
    if (distance < 30) {
        return true;
    } else {
        return false;
    }
}


function distanceBetweenLocations(currentlat, currentlon, questLat, questLon) {
    var p = 0.017453292519943295;
    var a = 0.5 - Math.cos((questLat - currentlat) * p) / 2 +
        Math.cos(currentlat * p) * Math.cos(questLat * p) *
        (1 - Math.cos((questLon - currentlon) * p)) / 2;
    return 12742 * Math.asin(Math.sqrt(a));
}


