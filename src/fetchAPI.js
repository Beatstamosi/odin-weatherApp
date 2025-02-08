import getDate from "./getDate";
import renderInfo from "./renderInfo";

export default async function fetchWeatherData(location) {
    let today = getDate();
    let dateOneWeek = getDate(8);

    try {
        let data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${today}/${dateOneWeek}?key=RY7DBY54JKFH3GRD5WAEK5RJT&include=days&elements=conditions,datetime,visibility,description,feelslike,humidity,uvindex,windspeed,precip,precipprob,feelslikemax,feelslikemin,icon,sunrise,sunset,tempmax,tempmin,temp&unitGroup=metric&iconSet=icons2`);
        let json = await data.json();

        console.log(processWeatherData(json));
        let formattedData = processWeatherData(json);
        renderInfo(formattedData);

    } catch (error) {
        console.log(error);
        // TODO: Process Error Information
    }
}

function processWeatherData(data) {
    return { "location": data.resolvedAddress, "today": data.days[0], "forecast": data.days.slice(2, 9) };
}

