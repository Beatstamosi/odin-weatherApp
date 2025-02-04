import getDate from "./getDate";

export default async function fetchWeatherData(location) {
    let today = getDate();
    let dateOneWeek = getDate(7);
    console.log(today);
    console.log(dateOneWeek);

    try {
        let data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${today}/${dateOneWeek}?key=RY7DBY54JKFH3GRD5WAEK5RJT&include=days&elements=conditions,datetime,description,icon,sunrise,sunset,tempmax,tempmin,temp&unitGroup=metric`);
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

