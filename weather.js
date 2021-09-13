//날씨 api (openweathermap)
const API_KEY = "ba32f6d8d6f33e5407a83e08fa7d13ac";

const COORDS = 'coords';

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
        //latitude = latitude 
        //longitude = longitude
    };
    saveCoords(coordsObj);
}

function handleGeoError() {

}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
    //api
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null){
        askForCoords();
    } else {

    }
}

function init() {
    loadCoords();
}

init();