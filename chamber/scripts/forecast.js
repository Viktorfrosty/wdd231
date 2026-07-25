const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=10.0739&lon=-69.322&units=imperial&appid=6e850696e089a955d7a35792a60c403b";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=10.0739&lon=-69.3228&units=imperial&appid=6e850696e089a955d7a35792a60c403b";

const cityLocation = document.querySelector("#location");
const weatherUl = document.querySelector("#weather-list");

if (!cityLocation || !weatherUl) {
    console.warn("Weather container not found.");
} else {
    getWeatherInfo();
    getForecastInfo();
}

async function getWeatherInfo() {
    try {
        const weatherResponse = await fetch(weatherUrl);

        if (!weatherResponse.ok) {
            throw new Error(await weatherResponse.text());
        }

        const weatherData = await weatherResponse.json();
        displayWeather(weatherData);
    } catch (error) {
        console.error("Weather fetch failed:", error);
        cityLocation.textContent = "Weather unavailable";
    }
}

async function getForecastInfo() {
    try {
        const forecastResponse = await fetch(forecastUrl);

        if (!forecastResponse.ok) {
            throw new Error(await forecastResponse.text());
        }

        const forecastData = await forecastResponse.json();
        displayLocation(forecastData.city);
        displayForecast(forecastData.list);
    } catch (error) {
        console.error("Forecast fetch failed:", error);
    }
}

function displayWeather(data) {
    const currentTemp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    const heading = document.createElement("li");
    const headingText = document.createElement("p");
    headingText.textContent = "Current weather";
    heading.appendChild(headingText);
    weatherUl.appendChild(heading);

    const weatherItem = document.createElement("li");
    weatherItem.className = "daily-weather";

    const weatherContent = document.createElement("div");
    weatherContent.className = "prediction";

    const weatherPrediction = document.createElement("p");
    weatherPrediction.innerHTML = `${currentTemp} &deg;F - ${description}`;

    const weatherIcon = document.createElement("img");
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/w/${icon}.png`);
    weatherIcon.setAttribute("alt", `${description} icon`);
    weatherIcon.setAttribute("loading", "lazy");
    weatherIcon.setAttribute("width", "50");
    weatherIcon.setAttribute("height", "50");

    weatherContent.appendChild(weatherPrediction);
    weatherContent.appendChild(weatherIcon);
    weatherItem.appendChild(weatherContent);
    weatherUl.appendChild(weatherItem);
}

function displayLocation(location) {
    const city = location.name;
    const country = location.country;
    cityLocation.textContent = `${city}, ${country}`;
}

function displayForecast(weatherList) {
    const forecastLabel = document.createElement("li");
    const forecastTitle = document.createElement("p");
    forecastTitle.textContent = "3-day forecast";
    forecastLabel.appendChild(forecastTitle);
    weatherUl.appendChild(forecastLabel);

    const dailyForecasts = weatherList
        .filter((entry) => entry.dt_txt.includes("12:00:00"))
        .slice(0, 3);

    dailyForecasts.forEach((weatherInfo) => {
        const weatherItem = document.createElement("li");
        weatherItem.className = "daily-weather";

        const weatherTitle = document.createElement("p");
        weatherTitle.textContent = new Date(weatherInfo.dt * 1000).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric"
        });

        const weatherContent = document.createElement("div");
        weatherContent.className = "prediction";

        const weatherPrediction = document.createElement("p");
        const temperature = Math.round(weatherInfo.main.temp);
        const weatherDescription = weatherInfo.weather[0].description;
        weatherPrediction.innerHTML = `${temperature} &deg;F - ${weatherDescription}`;

        const weatherIcon = document.createElement("img");
        weatherIcon.setAttribute("src", `https://openweathermap.org/img/w/${weatherInfo.weather[0].icon}.png`);
        weatherIcon.setAttribute("alt", `${weatherDescription} icon.`);
        weatherIcon.setAttribute("loading", "lazy");
        weatherIcon.setAttribute("width", "50");
        weatherIcon.setAttribute("height", "50");

        weatherContent.appendChild(weatherPrediction);
        weatherContent.appendChild(weatherIcon);

        weatherItem.appendChild(weatherTitle);
        weatherItem.appendChild(weatherContent);
        weatherUl.appendChild(weatherItem);
    });
}