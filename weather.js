//날씨 api (openweathermap)

const weather =document.querySelector(".js-weather");

const API_KEY = "ba32f6d8d6f33e5407a83e08fa7d13ac";

const COORDS = 'coords';

function getWeather(lat,lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        //fetch안에 가져올 데이터가 들어가면 된다
        //API_KEY는 서버에서 사용자가 무리하게 데이터를 쓰는지 확인할 수 있게 해준다
        //백틱을 넣고 $를 추가
        )
        .then(function(response){
            //then을 사용함으로써 앞의 함수가 실행이 끝날 때 까지 기다리도록 한다
            return response.json();
        })
        .then(function(json) {
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature} @ ${place}`;
        });
}

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
    getWeather(latitude,longitude);
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
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();