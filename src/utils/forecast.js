const axios = require('axios');

function forecast([long, lat], callback) {
    const weatherApi = 'http://api.weatherstack.com/current?';
    const apiKey = 'access_key=7f0ae9d5caa155b9d0e786fe505e31fc';
    const location = `&query=${lat},${long}`;
    const units = '&units=f'
    axios.get(`${weatherApi}${apiKey}${location}${units}`)
        .then((response) => {
            const {current, location} = response.data;
            console.log(response.data)
            if(current){
                let temp = current.temperature;
                let feelsLike = current.feelslike;
                let forecastData = {
                    address: `${location.name}, ${location.region}`,
                    temp,
                    feelsLike,
                    forecast: `It is ${current.weather_descriptions[0]}`
                }
                callback(undefined, forecastData);
            } else {
                callback({data});
            }

        })
        .catch(function (error) {
            callback(`forecast api error: ${error}`);
        });

}

module.exports = forecast;
