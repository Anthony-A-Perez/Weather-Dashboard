const apiKey = "8b522113569ab0de39504741cf85d7fd";
// const requestUrl = "api.openweathermap.org";
var fetchButton = document.getElementById('fetch-btn');


function getApi() {
    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=39&lon=-104&appid=' + apiKey;

    var city = document.getElementById("city");
    var temp = document.getElementById("temp");
    var cond = document.getElementById("cond")
    var wind = document.getElementById("wind")
    // var day1 = document.getElementById("day1");
    // var day2 = document.getElementById("day2");
    // var day3 = document.getElementById("day3");
    // var day4 = document.getElementById("day4");
    // var day5 = document.getElementById("day5");

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var currentCity = data.name;
            var currentTemp = Math.round((data.main.temp - 273.15) * 1.8 + 32) + " degrees";
            var currentCond = data.weather[0].description;
            var currentWind = data.wind.speed;

            console.log(currentTemp)
            console.log(currentCond)
            console.log(currentWind)
            console.log(currentCity)
            // for (var i = 0; i < data.length; i++) {

            // day1.textContent = data[0].weather.value;
            // day2.textContent = data[1].weather;
            // day3.textContent = data[2].weather;
            // day4.textContent = data[3].weather;
            // day5.textContent = data[4].weather;

            temp.textContent = currentTemp;
            cond.innerText = currentCond;
            wind.innerText = currentWind;
            city.innerText = currentCity

            // }
        });
}

fetchButton.addEventListener('click', getApi);


