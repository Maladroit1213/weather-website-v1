const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibXJlbnNvbiIsImEiOiJja3lkZmdpMWEwMXF6MnZzOGRtd3c5aHNtIn0.kkhFq_2UTtOBM0_dg0dMEQ&limit=1'

    request({ url: url, json: true }, (error, {body}) => {             //object shorthand then object destructuring
        if (error) {
            callback('Unable to connect to location services.', undefined)
        } else if (body.features.length === 0) {
            callback('Cannot find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        } 
    })
}

module.exports = geocode