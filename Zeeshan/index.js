const default_url = "api.openweathermap.org/data/2.5/weather?{INSERT HERE}&appid=3af5e590fcb669d8f872c8520264b0a2"
var cityName = "q={city name}, {state code}, {country code}";
var coordinates = "lat={lat}&lon={lon}";
var weather;
const ICON_INDEX = {
    '01d': 'CLEAR_DAY',
    '01n': 'CLEAR_NIGHT',
    '02d': 'PARTLY_CLOUDY_DAY',
    '02n': 'PARTLY_CLOUDY_NIGHT',
    '03d': 'CLOUDY',
    '03n': 'CLOUDY',
    '04d': 'CLOUDY', // Broken Clouds
    '04n': 'CLOUDY', // Broken Clouds
    '09d': 'RAIN', // Shower Rain
    '09n': 'RAIN', // Shower Rain
    '10d': 'RAIN',
    '10n': 'RAIN',
    '11d': 'RAIN', // Thunderstorm
    '11n': 'RAIN', // Thunderstorm
    '13d': 'SNOW',
    '13n': 'SNOW',
    '50d': 'FOG',
    '50n': 'FOG',
};

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

function getURLfromForm(formClass) {
    var data = Array.from(document.querySelectorAll(formClass + " .form-control")).reduce((acc, input) => ({ ...acc, [input.name]: input.value }), {});
    Object.entries(data).map((subArray, index) => {
        cityName = cityName.replace('{' + subArray[0] + '}', subArray[1]);
    });
    var url = 'http://' + default_url.replace('{INSERT HERE}', cityName);
    //document.getElementsByClassName('url')[0].innerText = url;
    return url
}

function getCityFormData(event) {
    var url = getURLfromForm('.cityNameForm')

    // OpenWeather API Call
    fetch(url)
        .then(res => res.json())
        .then(res => {
            weather = res;
        })
        .then(() => {
            const description = 'description: ' + weather.weather[0].description;
            const temperature = 'temperature: ' + weather.main.temp;
            const time = 'time: ' + weather.dt;
            const cityName = 'city name: ' + weather.name;
            const icon = weather.weather[0].icon;

            document.getElementsByClassName('weatherOutput')[0].innerText = description + '\n' + temperature + '\n' + time + '\n' + cityName;
            setIcons(icon, document.querySelector('.icon'));
        });

    return false;
}

function setIcons(iconId, displayId) {
    const skycons = new Skycons({ color: "black" });
    const currentIcon = ICON_INDEX[iconId];
    skycons.play();
    return skycons.set(displayId, Skycons[currentIcon]);
}

// This is me making a change - test