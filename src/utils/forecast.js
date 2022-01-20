const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6c42e5369556147ea58fd89e64affee4&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true }, (error, { body }) => {              //object shorthand then object destructuring
        if (error) {
            callback("Unable to connect to weather service.", undefined)
        } else if (body.error) {
            callback("Error: " + body.error.info, undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + " with a temperature of " + body.current.temperature + " degrees outside. It'll feel like " + body.current.feelslike + " degrees.\nWind speed is "+body.current.wind_speed+" km/h from the " +body.current.wind_dir+".")
        }         
    })
}

module.exports = forecast