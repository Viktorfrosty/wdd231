const forecast = "https://api.openweathermap.org/data/2.5/forecast?lat=10.0739&lon=-69.322&units=imperial&appid=6e850696e089a955d7a35792a60c403b";

const weather = "https://api.openweathermap.org/data/2.5/weather?lat=10.0739&lon=-69.3228&units=imperial&appid=6e850696e089a955d7a35792a60c403b";

let timing = (Math.floor(Date.now() / 1000) + 3 * 60 * 60);

const cityLocation = document.querySelector("#location");

const weatherUl = document.querySelector("#weather-list");

let forecastCounter = 0;

async function getWeatherInfo() {
    
    try {

        let weatherInfo = await fetch(weather);

        if (weatherInfo.ok) {
            
            let weatherProcessedInfo = await weatherInfo.json();

            displayWeather(weatherProcessedInfo)

        } else {

            throw Error(await weatherInfo.text());

        };

    } catch (error) {

        console.log(error);
        
    };

}

async function getForecastInfo() {

    try {

        let forecastInfo = await fetch(forecast);

        if (forecastInfo.ok) {
            
            let forecastProcessedInfo = await forecastInfo.json();
        
            displayLocation(forecastProcessedInfo.city);

            displayforecast(forecastProcessedInfo.list)

        } else {

            throw Error(await forecastInfo.text());

        };

    } catch (error) {

        console.log(error);
        
    };

};

function displayWeather(data) {
    
    let li = document.createElement("li");

    let banner = document.createElement("p");

    banner.textContent = `Weather`;

    li.appendChild(banner);

    weatherUl.appendChild(li);

    let weatherLi = document.createElement("li");
    
    let weatherPrediction = document.createElement("p");

    let div = document.createElement("div");

    let temp = data.main.temp;

    let desc = data.weather[0].description;

    let weatherIcon = document.createElement("img");

    weatherIcon.setAttribute("src", `https://openweathermap.org/img/w/${data.weather[0].icon}.png`)

    weatherIcon.setAttribute("alt", `${desc} icon`)

    weatherIcon.setAttribute("loading", "lazy");

    weatherIcon.setAttribute("width", "50");

    weatherIcon.setAttribute("height", "50");

    weatherPrediction.innerHTML = `${temp} &deg;F - ${desc}`;

    weatherLi.setAttribute("class","daily-weather");

    div.appendChild(weatherPrediction);

    div.appendChild(weatherIcon);

    div.setAttribute("class", "prediction");
    
    weatherLi.appendChild(div);

    weatherUl.appendChild(weatherLi);

};

function displayLocation(location) {

    const city = location.name;

    const country = location.country;

    cityLocation.textContent = `${city}, ${country}`;

};

function displayforecast(weatherList) {

    let li = document.createElement("li");

    let banner = document.createElement("p");

    banner.textContent = `Forecast`;

    li.appendChild(banner);

    weatherUl.appendChild(li);

    weatherList.forEach(weatherInfo => {

        if (weatherInfo.dt > timing && weatherInfo.dt_txt.includes("06:00:00") && forecastCounter < 3) {

            let div = document.createElement("div");

            let weatherLi = document.createElement("li");

            let weatherTitle = document.createElement("p");
            
            let weatherPrediction = document.createElement("p");

            let weatherIcon = document.createElement("img");

            weatherTitle.textContent = `${weatherInfo.dt_txt}`;

            let temperature = weatherInfo.main.temp;

            let weatherDescription = weatherInfo.weather[0].description;

            weatherPrediction.innerHTML = `${temperature} &deg;F - ${weatherDescription}`;

            weatherIcon.setAttribute("src", `https://openweathermap.org/img/w/${weatherInfo.weather[0].icon}.png`);

            weatherIcon.setAttribute("alt", `${weatherDescription} icon.`);

            weatherIcon.setAttribute("loading", "lazy");

            weatherIcon.setAttribute("width", "50");

            weatherIcon.setAttribute("height", "50");

            weatherLi.setAttribute("class","daily-weather");

            weatherLi.appendChild(weatherTitle);

            div.appendChild(weatherPrediction);

            div.appendChild(weatherIcon);
        
            div.setAttribute("class", "prediction");
            
            weatherLi.appendChild(div);

            weatherUl.appendChild(weatherLi);

            forecastCounter++;
            
        };

    });

}

getWeatherInfo();

getForecastInfo();