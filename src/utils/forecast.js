// import request from 'request';
const request = require('request');

const forecast = (location, callback) => {
    const lat = location.Latitude;
    const lon = location.Longitude;
    const url = 'http://api.weatherstack.com/current?access_key=f0607c17cdfcc2a53ae9152f4db8fe90&query=' + lat +',' + lon + '&units=m';

    request({url: url, json: true}, (error,{body} = {})=> {
        if(error){
            callback('Unable to connect with weatherStack API', undefined)
        }
        else if(body.error){
            callback(body.error.info, undefined)
        }
        else{
            callback(undefined, `${body.current.weather_descriptions[0]}. Current temperature is ${body.current.temperature}° Celsius. Precipitation: ${body.current.precip}.`)
        }
    })

}

// FOR TESTING ONLY
// forecast({latitude: 28.7, longitude: 77.2}, (error, data) => {
//     console.log('Error: ', error);
//     console.log('Data: ', data);
// })

// {
//     temperature: body.current.temperature,
//     precipitation: body.current.precip,
//     weather_description: body.current.weather_descriptions[0]
// } 

module.exports = forecast;