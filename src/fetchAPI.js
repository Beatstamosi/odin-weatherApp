import getDate from "./getDate";

export default async function fetchWeatherData(location) {
    let today = getDate();
    let dateOneWeek = getDate(7);

    try {
        let data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${today}/${dateOneWeek}?key=RY7DBY54JKFH3GRD5WAEK5RJT&include=days&elements=conditions,datetime,description,feelslike,humidity,uvindex,windspeed,precip,feelslikemax,feelslikemin,icon,sunrise,sunset,tempmax,tempmin,temp&unitGroup=metric&iconSet=icons2`);
        let json = await data.json();

        console.log(processWeatherData(json));

        return processWeatherData(json);
    } catch (error) {
        console.log(error);
        // TODO: Process Error Information
    }
}

function processWeatherData(data) {
    return {"location": data.resolvedAddress, "days": data.days }
}

