import fetchWeatherData from "./fetchAPI";

export default function addButtonListenerGetWeather() {
  const submitBtn = document.querySelector("#get-weather");
  const input = document.querySelector("#location-search");

  submitBtn.addEventListener("click", (event) => {
    fetchWeatherData(input.value);
  });

  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      fetchWeatherData(input.value);
    }
  })
}
