// first imports.......................
import locationsArray from '../init-locations.js';

// helper functions....................


// event handlers......................

let locationElement = document.getElementById("location");

window.addEventListener('load', main);
locationElement.addEventListener('click', locationHandler);
locationElement.addEventListener('touch', locationHandler);

function main() {
    console.log('Page fully loaded');
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
    document.getElementById("device-lat").innerHTML = "This device's Latitude : " + currentlat.toFixed(6);
    currentlon = locText.coords.longitude;
    document.getElementById("device-long").innerHTML = "This device's Longitude : " + currentlon.toFixed(6);

    locationsArray.forEach(function (value) {
        if (isInside(value.Latitude, value.Longitude)) {
            document.getElementById("locationAnswer").innerHTML = value.Name;
            const utterance = new SpeechSynthesisUtterance();
            utterance.text = `Hello from Krishna, Congratulations! You have reached ${value.Name}`;
            window.speechSynthesis.speak(utterance);
            error = false;
        }

    // locationsArray.forEach(function (value) {
    //     if (isInside(value.Latitude, value.Longitude)) {
    //         document.getElementById("locationAnswer").innerHTML = value.Name;
    //         let utterance = new SpeechSynthesisUtterance("Hello from Krishna, Congratulations! You have reached "+value.Name);
    //         speechSynthesis.speak(utterance);
    //         error = false;
    //     }
    });

    // In case of any error where if the device is not 30m range it displays error.

    if (error) {
      //  document.getElementById("error-message").innerHTML = "You're not in any specified areas";
        // let utterance = new SpeechSynthesisUtterance("You're not in any specified areas");
        //     speechSynthesis.speak(utterance);
        let innerHTML = "You're not in any specified areas";
        document.getElementById("error-message").innerHTML = innerHTML;
        const utterance = new SpeechSynthesisUtterance(innerHTML);
        //utterance.text = `Sorry,You're not in the radius range.`;
        window.speechSynthesis.speak(utterance);
    } else{
        document.getElementById("error-message").innerHTML = "";
    }
}


//checking if distance is in 20m range.


function isInside(questLat, questLon) {
    let distance = distanceBetweenLocations(questLat, questLon);//currentlat, currentlon, questLat, questLon);
    console.log("distance: " + distance);
    if (distance > 20) {
        return true;
    } else {
        return false;
    }
}

function distanceBetweenLocations(questLat, questLon) {
    const R = 6371e3;
    const φ1 = currentlat * Math.PI / 180;
    const φ2 = questLat * Math.PI / 180;
    const Δφ = (questLat - currentlat) * Math.PI / 180;
    const Δλ = (questLon - currentlon) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;
    return d; 
}

// function distanceBetweenLocations(currentlat, currentlon, questLat, questLon) {
//     var p = 0.017453292519943295;
//     var a = 0.5 - Math.cos((questLat - currentlat) * p) / 2 +
//         Math.cos(currentlat * p) * Math.cos(questLat * p) *
//         (1 - Math.cos((questLon - currentlon) * p)) / 2;
//     return 12742 * Math.asin(Math.sqrt(a));
// }


