export default function renderInfo(data) {
    // Daily Info
    const locationDisplay = document.querySelector("#location-display");
    locationDisplay.textContent = data.location;

    const dateDisplay = document.querySelector("#date-display");
    dateDisplay.textContent = formatDate(data.today.datetime);

    const weatherIconToday = document.querySelector("#weather-icon-day");
    setIcon(data.today.icon, weatherIconToday);

    const temperatureDisplay = document.querySelector("#temperature-display");
    temperatureDisplay.textContent = `${data.today.temp}°`;

    const conditionDisplay = document.querySelector("#condition-display");
    conditionDisplay.textContent = data.today.conditions;

    const feelsLikeDisplay = document.querySelector("#display-feels-like");
    feelsLikeDisplay.textContent = `${data.today.feelslike}°`;

    const displayWindSpeed = document.querySelector("#display-wind-speed");
    displayWindSpeed.textContent = data.today.windspeed;
    // TODO: Add km/h or miles depending on metric system

    const displayVisibility = document.querySelector("#display-visibility");
    displayVisibility.textContent = data.today.visibility;
    // TODO: Add proper metric system

    const displayHumidity = document.querySelector("#display-humidity");
    displayHumidity.textContent = `${data.today.humidity}%`;

    const displaySunrise = document.querySelector("#display-sunrise");
    displaySunrise.textContent = data.today.sunrise.split(":", 2).join(":");

    const displaySunset = document.querySelector("#display-sunset");
    displaySunset.textContent = data.today.sunset.split(":", 2).join(":");

    const displayHighestTemp = document.querySelector("#display-highest-temp");
    displayHighestTemp.textContent = `${data.today.tempmax}°`;

    const displayLowestTemp = document.querySelector("#display-lowest-temp");
    displayLowestTemp.textContent = `${data.today.tempmin}°`;

    const displayPrecipProb = document.querySelector("#display-precip-prob");
    displayPrecipProb.textContent =  `${data.today.precipprob}%`;

    const displayPrecipTotal = document.querySelector("#display-precip-total");
    displayPrecipTotal.textContent = `${data.today.precip}mm`;

    const displayUVIndex = document.querySelector("#display-uv-index");
    let UVIndex = data.today.uvindex !== "0" ? data.today.uvindex : "1";
    let UVIndexIconName = `uv-index-${UVIndex}`;
    setIcon(UVIndexIconName, displayUVIndex);

    const displayDescription = document.querySelector("#display-description");
    displayDescription.textContent = data.today.description;

    // Weekly Forecast
    renderWeeklyForecast(data.forecast);
}

function renderWeeklyForecast(forecast) {
    const containerWeeklyForecast = document.querySelector("#container-weekly-forecast");

    containerWeeklyForecast.innerHTML = "";

    forecast.forEach((day, index) => {
        let container = document.createElement("div");
        container.classList.add("container-weekly-forecast-info");

        let weekday = document.createElement("p");
        weekday.classList.add("weekday");
        weekday.textContent = getWeekday(day.datetime);

        let datetime = document.createElement("p");
        datetime.classList.add("datetime");
        datetime.textContent = formatDate(day.datetime);

        let image = document.createElement("img");
        image.classList.add("weather-icon-weekly");
        image.id = `forecast-icon-${index}`;
        setIcon(day.icon, image);

        let tempInfo = document.createElement("div");
        tempInfo.classList.add("temperatures-weekly");
        let temp1 = document.createElement("p");
        temp1.classList.add("temperature-weekly-max");
        temp1.textContent = `${day.tempmax}°`;
        let temp2 = document.createElement("p");
        temp2.classList.add("temperature-weekly-min");
        temp2.textContent = `${day.tempmin}°`;
        tempInfo.append(temp1, temp2);

        container.append(weekday, datetime, image, tempInfo);

        containerWeeklyForecast.appendChild(container);
    })
}

function getWeekday(datetime) {
    let date = new Date(datetime + 'T00:00:00');
    const options = { weekday: 'long'};
    return date.toLocaleDateString("en-US", options);
}

function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    const options = { month: 'long', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  }


export function setIcon(imageName, icon) {
    const icons = getIcons();
    
    let imagePath = icons[imageName];

    if (imagePath) {
        icon.src = imagePath;
    }
}

function getIcons() {
    const icons = require.context('./icons', false, /\.(png|jpe?g|gif)$/);

    const iconMap = icons.keys().reduce((map, file) => {
        const iconName = file.replace('./', '').replace(/\.[^/.]+$/, ''); // Get icon name without extension
        map[iconName] = icons(file);
        return map;
      }, {});

    return iconMap

}
