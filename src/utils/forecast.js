const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6c42e5369556147ea58fd89e64affee4&query='+latitude+','+longitude+'&units=m'

    request({url, json: true},(error, {body}) => {              //object shorthand then object destructuring
        if(error){
            callback("Unable to connect to weather service.", undefined)
        } else if (body.error){
            callback("Error: " + body.error.info, undefined)
        } else {
            callback(undefined, "It's " + body.current.weather_descriptions[0].toLowerCase() + " with a temperature of " + body.current.temperature + " degrees outside, and it'll feel like " + body.current.feelslike + " degrees.")
        }         
    })
}

module.exports = forecast