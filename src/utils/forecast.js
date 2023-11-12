const request = require('postman-request')
require('dotenv').config()

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=' + process.env.WEATHERSTACK_API_KEY + '&query='+latitude+','+longitude
    request({url, json: true}, (error,{body}) => {
        if(error){
            callback('Error occoured!', undefined)
        } else if(body.success==false){
            callback(body.error.info, undefined)
        } else{
            callback(undefined, body.current.weather_descriptions[0] + ". it\'s " + body.current.temperature + " deg. but it fells like " + body.current.feelslike + " deg.")
        }
    })
}

module.exports = forecast