function weather() {
    const inputField = document.querySelector('.input_field');
    const weatherToday = document.querySelector('.block_today');
    const weatherFiveDays = document.querySelector('.block_5days');
    const nameCity = document.querySelector('.name_city');
    const clear = document.querySelector('.clear');


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccessWeather);
        navigator.geolocation.getCurrentPosition(onSuccessForecast);
    } else {
        alert('Your browser does not support geolocation');
    }

    function onSuccessWeather(position) {
        const { latitude, longitude } = position.coords;
        const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=e492e6a61c520ed93535558fbb66a4f8`;

        weatherRequest(weatherApi);
    }

    function onSuccessForecast(position) {
        const { latitude, longitude } = position.coords;
        const forecastApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=e492e6a61c520ed93535558fbb66a4f8`;

        forecastRequest(forecastApi);
    }

    inputField.addEventListener("keyup", e => {
        if (e.key === "Enter" && inputField.value != "") {

            getWeatherApi(inputField.value);
            getForecastApi(inputField.value);
        }
    })

    clear.onclick = function () {
        inputField.value = '';
    }

    function getWeatherApi(city) {
        let weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e492e6a61c520ed93535558fbb66a4f8`;

        weatherRequest(weatherApi);
    }

    function getForecastApi(city) {
        let forecastApi = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=e492e6a61c520ed93535558fbb66a4f8`;

        forecastRequest(forecastApi);
    }

    function weatherRequest(api) {
        fetch(api)
            .then(resp => resp.json())
            .then(data => getWeather(data))
            .catch(err => alert("There is no such city!"))
    }

    function forecastRequest(api) {
        fetch(api)
            .then(resp => resp.json())
            .then(data => getForecast(data))
    }

    function getWeather(data) {
        const city = data.name;
        const country = data.sys.country;
        const temp = Math.round(data.main.temp);
        const feelsLike = Math.round(data.main.feels_like);
        const weatherStatus = data.weather[0].main;
        const weatherIcon = data.weather[0].icon;
        nameCity.innerHTML = `Selected: ${city}, ${country}`;

        const template = `
            <div class="weather_today">
                <div class="weather_temp_today">${temp}&degC</div>
                <div class="weather-status_today">${weatherStatus}</div>
                <div class="weather_icon_today">
                    <img src="https://openweathermap.org/img/w/${weatherIcon}.png">
                </div>
                <div class="weather_feels-like_today">Feels like ${feelsLike}&degC</div>
                <div class="weather_city">${city}, ${country}</div>  
            </div>`
        weatherToday.innerHTML = template;
    }

    function getForecast(data) {
        let template = '';
        let k = 4;

        for (let i = 0; i < 5; i++) {
            const tempMin = Math.round(data.list[k].main.temp_min);
            const tempMax = Math.round(data.list[k].main.temp_max);
            const weatherStatus = data.list[k].weather[0].main;
            const weatherIcon = data.list[k].weather[0].icon;
            const day = weekday[checkDay(i)];

            template += `
                <div class="weather_5days">
                    <div class="day">${day}</div>
                    <div class="weather_icon">
                        <img src="https://openweathermap.org/img/w/${weatherIcon}.png">
                    </div>
                    <div class="weather-status">${weatherStatus}</div>
                    <div class="weather_temp_min">${tempMin}&degC</div>
                    <div class="weather_temp_max">${tempMax}&degC</div>            
                </div>`

            k = k + 8;
        }
        weatherFiveDays.innerHTML = template;
    }

    const d = new Date();
    const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    function checkDay(day) {
        if (day + d.getDay() > 6) {
            return day + d.getDay() - 7;

        } else {
            return day + d.getDay();
        }
    }
}

window.onload = function () {
    weather();
}



