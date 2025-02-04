import fetchWeatherData from "./fetchAPI";

export default function addButtonListenerGetWeather() {
    const submitBtn = document.querySelector("#get-weather");
    const input = document.querySelector("#location");

    submitBtn.addEventListener("click", (event) => {
        event.preventDefault();
        fetchWeatherData(input.value);
    })
}