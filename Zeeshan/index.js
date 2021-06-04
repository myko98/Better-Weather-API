function showOnlyCityName() {
    var cityName = document.getElementsByClassName("cityName")[0];
    var coordinates = document.getElementsByClassName("coordinates")[0];
    cityName.style.display = "block";
    coordinates.style.display = "none";
}

function showOnlyCoordinates() {
    var cityName = document.getElementsByClassName("cityName")[0];
    var coordinates = document.getElementsByClassName("coordinates")[0];
    cityName.style.display = "none";
    coordinates.style.display = "block";
}