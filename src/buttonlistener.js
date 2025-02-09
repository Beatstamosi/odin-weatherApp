import fetchWeatherData from "./fetchAPI";
import { setIcon } from "./renderInfo";

const locationHandling = (function () {
  let currentLocation;
  let unit = "metric";

  const setLocation = () => {
    const input = document.querySelector("#location-search");
    currentLocation = input.value;
  };

  const getLocation = () => {
    return currentLocation;
  };

  const setUnit = (indicator) => {
    unit = indicator === "celsius" ? "metric" : "us";
  };

  const getUnit = () => {
    return unit;
  };

  return {
    setLocation,
    getLocation,
    setUnit,
    getUnit,
  };
})();

export default function addButtonListenerGetWeather() {
  const submitBtn = document.querySelector("#get-weather");
  const input = document.querySelector("#location-search");
  const celsiusBtn = document.querySelector("#toggle-celsius");
  const fahrenheitBtn = document.querySelector("#toggle-fahrenheit");
  let indicator;

  submitBtn.addEventListener("click", () => {
    // initialize first fetch with Celsius Data
    if (indicator === undefined) {
      indicator = "celsius";
      styleUnitBtn(celsiusBtn, fahrenheitBtn, indicator);
    }
    prepareFetch();
  });

  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      // initialize first fetch with Celsius Data
      if (indicator === undefined) {
        indicator = "celsius";
        styleUnitBtn(celsiusBtn, fahrenheitBtn, indicator);
      }
      prepareFetch();
    }
  });

  celsiusBtn.addEventListener("click", () => {
    indicator = "celsius";
    locationHandling.setUnit(indicator);
    styleUnitBtn(celsiusBtn, fahrenheitBtn, indicator);
    prepareFetch();
  });

  fahrenheitBtn.addEventListener("click", () => {
    indicator = "fahrenheit";
    locationHandling.setUnit(indicator);
    styleUnitBtn(celsiusBtn, fahrenheitBtn, indicator);
    prepareFetch();
  });
}

function prepareFetch() {
  locationHandling.setLocation();
  let location = locationHandling.getLocation();
  let unit = locationHandling.getUnit();
  fetchWeatherData(location, unit);
}

function styleUnitBtn(celsiusBtn, fahrenheitBtn, indicator) {
  const textCelsius = celsiusBtn.querySelector("p");
  const textFahrenheit = fahrenheitBtn.querySelector("p");
  const imgCelsius = celsiusBtn.querySelector("img");
  const imgFahrenheit = fahrenheitBtn.querySelector("img");
  let imgNameCelsius =
    indicator === "celsius"
      ? "thermometer-celsius"
      : "thermometer-glass-celsius";
  let imgNameFahrenheit =
    indicator === "fahrenheit"
      ? "thermometer-fahrenheit"
      : "thermometer-glass-fahrenheit";

  setIcon(imgNameCelsius, imgCelsius);
  setIcon(imgNameFahrenheit, imgFahrenheit);

  textCelsius.style.color =
    indicator === "celsius" ? "black" : "rgb(165, 163, 163)";
  textFahrenheit.style.color =
    indicator === "fahrenheit" ? "black" : "rgb(165, 163, 163)";
}
