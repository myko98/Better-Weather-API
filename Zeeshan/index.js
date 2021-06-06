const default_url = "api.openweathermap.org/data/2.5/weather?{INSERT HERE}&appid=3af5e590fcb669d8f872c8520264b0a2"
var coordinates = "lat={lat}&lon={lon}";

function showOnlyCityName() {
    var cityName = document.getElementsByClassName("cityNameForm")[0];
    var coordinates = document.getElementsByClassName("coordinatesForm")[0];
    cityName.style.display = "block";
    coordinates.style.display = "none";
}

function showOnlyCoordinates() {
    var cityName = document.getElementsByClassName("cityNameForm")[0];
    var coordinates = document.getElementsByClassName("coordinatesForm")[0];
    cityName.style.display = "none";
    coordinates.style.display = "block";
}

function getCityFormData() {
    // Get Data and Format into URL for GET Request 
    var data = Array.from(document.querySelectorAll(".cityNameForm .form-control")).reduce((acc, input) => ({ ...acc, [input.name]: input.value }), {});
    var cityName = "q={city name}, {state code}, {country code}";
    Object.entries(data).map((subArray, index) => {
        cityName = cityName.replace('{' + subArray[0] + '}', subArray[1]);
    });
    var url = 'http://' + default_url.replace('{INSERT HERE}', cityName);

    // Print URL -- Remove later 
    document.getElementsByClassName('url')[0].innerText = url;

    // OpenWeather API Call
    fetch(url).then(res => res.json()).then(res => {
        document.getElementsByClassName('weatherOutput')[0].innerText = JSON.stringify(res);
    });
}