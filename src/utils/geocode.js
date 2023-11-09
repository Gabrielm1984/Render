const request = require('postman-request')
require('dotenv').config

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=' + process.env.POSITIONSTACK_API_KEY + '&query='+encodeURIComponent(address)
    request({url, json: true}, (error, {body}) =>{
        if(error) {
            callback('Error occoured!', undefined)
        } else if (body.data == 0){
            callback('location not found', undefined)
        } else {
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                label: body.data[0].label
            })
        }
    })
}

module.exports = geocode