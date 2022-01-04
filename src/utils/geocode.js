// import request from 'request';
const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia3lhc2gzMDc5IiwiYSI6ImNreHQ5dGNoZzFmYXoycHA0ZWg3eXc5aWsifQ.DAHq7O2Bpq7CufOWs7KlFg&limit=1'

    request({url: url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to location services', undefined);
        }
        else if(body.features.length === 0){
            callback('Unable to find the location', undefined);
        }
        else{
            callback(undefined, {
                Location: body.features[0].place_name,
                Latitude: body.features[0].center[1],
                Longitude: body.features[0].center[0] 
            })
        }
    })
}

module.exports = geocode;