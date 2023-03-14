const apiKey = "8b522113569ab0de39504741cf85d7fd";
var fetchButton = document.getElementById('fetch-btn');
var cityInput = document.getElementById('city-input');

function getApi(reSearch) {

    //console.log("reSearch: ", typeof reSearch, reSearch);

    var cityName = cityInput.value;
    if (typeof reSearch === 'string') {
        cityName = reSearch

    };
    var latLon = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + apiKey;
    // console.log(cityName);


    fetch(latLon)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data[0].lon);



            var lat = data[0].lat;
            var lon = data[0].lon;
            // console.log(lat, lon);
            var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;

            fetch(requestUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    // console.log(data);
                    // console.log(data.weather[0].icon)

                    var currentCity = data.name;
                    var currentTemp = Math.round((data.main.temp - 273.15) * 1.8 + 32) + ' \u00B0F';
                    var currentCond = data.weather[0].description;
                    var currentWind = Math.round(data.wind.speed) + ' mph';
                    var weatherIcon = data.weather[0].icon;
                    var iconUrl = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
                    // console.log(iconUrl)
                    // console.log(currentCond)
                    // console.log(currentWind)
                    // console.log(currentCity)

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

                    var requestFore = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;

                    var tem0 = document.getElementById("tem-0");
                    var tem1 = document.getElementById("tem-1");
                    var tem2 = document.getElementById("tem-2");
                    var tem3 = document.getElementById("tem-3");
                    var tem4 = document.getElementById("tem-4");
                    var tem = [tem0, tem1, tem2, tem3, tem4];

                    var win0 = document.getElementById("win-0");
                    var win1 = document.getElementById("win-1");
                    var win2 = document.getElementById("win-2");
                    var win3 = document.getElementById("win-3");
                    var win4 = document.getElementById("win-4");
                    var win = [win0, win1, win2, win3, win4];

                    var hum0 = document.getElementById("hum-0");
                    var hum1 = document.getElementById("hum-1");
                    var hum2 = document.getElementById("hum-2");
                    var hum3 = document.getElementById("hum-3");
                    var hum4 = document.getElementById("hum-4");
                    var hum = [hum0, hum1, hum2, hum3, hum4];

                    var icon0 = document.getElementById("icon-0");
                    var icon1 = document.getElementById("icon-1");
                    var icon2 = document.getElementById("icon-2");
                    var icon3 = document.getElementById("icon-3");
                    var icon4 = document.getElementById("icon-4");
                    var icon = [icon0, icon1, icon2, icon3, icon4];

                    var date0 = document.getElementById("date-0");
                    var date1 = document.getElementById("date-1");
                    var date2 = document.getElementById("date-2");
                    var date3 = document.getElementById("date-3");
                    var date4 = document.getElementById("date-4");
                    var date = [date0, date1, date2, date3, date4];


                    var ul = document.getElementById('recent');
                    var list = document.createElement('li');

                    list.addEventListener('click', function (e) {
                        var reSearch = e.target.innerText;
                        latLon.replace(cityName, reSearch);
                        if (cityName = " ") {
                            console.log(reSearch);
                            getApi(reSearch)
                        };
                        if (list.innerText === list.innerText) {
                        list.remove();
                        };
                    });

                    list.setAttribute('class', 'func')
                    list.innerText = cityName.toUpperCase();
                    ul.appendChild(list);
                    localStorage.setItem('city-input', cityName);
                    cityInput.value = '';

                    fetch(requestFore)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (data) {
                            for (i = 0; i < 5; i++) {
                                // console.log(data);
                                // console.log(data.list[((i + 1) * 8) - 1].weather[0].icon);

                                var dayTemp = data.list[((i + 1) * 8) - 1].main.temp;
                                var dayTempConv = 'Temp: ' + Math.round((dayTemp - 273.15) * 1.8 + 32) + "  \u00B0F";
                                // console.log(dayTempConv);
                                var dayWind = 'Wind: ' + Math.round(data.list[((i + 1) * 8) - 1].wind.speed) + ' mph';
                                var dayHum = 'Humidity: ' + data.list[((i + 1) * 8) - 1].main.humidity + '%';
                                var dayIcon = data.list[((i + 1) * 8) - 1].weather[0].icon;
                                var dayIconUrl = "https://openweathermap.org/img/wn/" + dayIcon + "@2x.png";
                                var dayDate = new Date((data.list[((i + 1) * 8) - 1].dt) * 1000).toLocaleDateString();
                                // console.log(dayDate);

                                tem[i].innerText = dayTempConv;
                                win[i].innerText = dayWind;
                                hum[i].innerText = dayHum;
                                icon[i].setAttribute('src', dayIconUrl);
                                date[i].innerText = dayDate;




                            }

                        })

                })

        })

}

fetchButton.addEventListener('click', getApi);






