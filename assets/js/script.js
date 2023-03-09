const apiKey = "8b522113569ab0de39504741cf85d7fd";
// const requestUrl = "api.openweathermap.org";
var fetchButton = document.getElementById('fetch-btn');

function getApi() {

    var cityInput = document.getElementById('city-input');
    var cityName = cityInput.value

    var latLon = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + apiKey;
    console.log(cityName);

    fetch(latLon)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data[0].lon);

            var lat = data[0].lat;
            var lon = data[0].lon;
            console.log(lat, lon);
            var requestUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;

            fetch(requestUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    console.log(data.weather[0].icon)

                    var currentCity = data.name;
                    var currentTemp = Math.round((data.main.temp - 273.15) * 1.8 + 32) + " degrees";
                    var currentCond = data.weather[0].description;
                    var currentWind = data.wind.speed;
                    var weatherIcon = data.weather[0].icon;
                    var iconUrl = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
                    console.log(iconUrl)
                    console.log(currentCond)
                    console.log(currentWind)
                    console.log(currentCity)



                    var iconImg = document.querySelector('img');
                    var city = document.getElementById("city");
                    var temp = document.getElementById("temp");
                    var cond = document.getElementById("cond");
                    var wind = document.getElementById("wind");

                    temp.innerText = currentTemp;
                    cond.innerText = currentCond;
                    wind.innerText = currentWind;
                    city.innerText = currentCity;
                    iconImg.setAttribute('src', iconUrl);

                    var requestFore = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;

                    var day0 = document.getElementById("day-0");
                    var day1 = document.getElementById("day-1");
                    var day2 = document.getElementById("day-2");
                    var day3 = document.getElementById("day-3");
                    var day4 = document.getElementById("day-4");
                    fetch(requestFore)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (data) {
                            for (i = 0; i < 5; i++) {
                                // console.log(data);
                                // console.log(data.list[((i + 1) * 8) - 1].main.temp);

                                var dayTemp = data.list[((i + 1) * 8) - 1].main.temp;
                                var dayTempConv = Math.round((dayTemp - 273.15) * 1.8 + 32) + " degrees";
                                console.log(dayTempConv);

                                day0.innerText = dayTempConv;
                                day1.innerText = dayTempConv;
                                day2.innerText = dayTempConv;
                                day3.innerText = dayTempConv;
                                day4.innerText = dayTempConv;
                            }




                            // day1.textContent = data[0].weather.value;
                            // day2.textContent = data[1].weather;
                            // day3.textContent = data[2].weather;
                            // day4.textContent = data[3].weather;
                            // day5.textContent = data[4].weather;

                        })










                })


        })


}





fetchButton.addEventListener('click', getApi);


