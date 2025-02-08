import "./styles.css";
import addButtonListenerGetWeather from "./buttonlistener";
import fetchWeatherData from "./fetchAPI";

addButtonListenerGetWeather();

fetchWeatherData("london");



// eventlistener "enter" to searchbar
    // call fetchAPI
// eventlistener "click" to enter-button
    // call fetchAPI

// render info
    // content today
        // content-left today
        // details today
        // --> get fields and set content
    // weekly forecast, for each element create proper HTML
        // transform date into weekday
        // transform date into "Month, day"


// button celsius and fahrenheit
    // call fetchAPI with celsius or Fahrenheit
    // render info
    // change font-color of options (chosen one black, other grey)



// SET UP DETAILS TODAY WITH CORRECT IMAGES