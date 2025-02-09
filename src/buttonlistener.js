import fetchWeatherData from "./fetchAPI";

const locationHandling = function() {
  let currentLocation;
  let unit = "metric";

  const setLocation = () => {
    const input = document.querySelector("#location-search");
    currentLocation = input.value;
  }

  const getLocation = () => {
    return currentLocation
  }

  const toggleUnit = () => {
    unit = unit === "metric" ? "us" : "metric";
  }

  const getUnit = () => {
    return unit;
  }

  return {
    setLocation,
    getLocation,
    toggleUnit,
    getUnit
  }
}();

export default function addButtonListenerGetWeather() {
  const submitBtn = document.querySelector("#get-weather");
  const input = document.querySelector("#location-search");

  submitBtn.addEventListener("click", () => {
    prepareFetch();
  });

  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      prepareFetch();
    }
  })
}

function prepareFetch() {
    locationHandling.setLocation();
    let location = locationHandling.getLocation();
    let unit = locationHandling.getUnit();
    fetchWeatherData(location, unit);
}

