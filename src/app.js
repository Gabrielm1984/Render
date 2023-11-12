const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000
//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars and view location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup for static directory
app.use(express.static(publicDirectoryPath, {
    extensions: ['html']
}))


app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Gabriel Manchim'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Gabriel Manchim'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Help',
        name: 'Gabriel Manchim',
        helpMessage: 'This is a Help message provided by src/app.js'   
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'address must be provided'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, label} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                title: 'Weather',
                name: 'Gabriel Manchim',
                label: label,
                forecast: forecastData
            })
        })
    })
})

//Error Pages
app.get('/help/*', (req,res) => {
    res.render('404',{
        title: 'Help',
        errorMessage: 'Help sub-rout NotFound',
        name: 'Gabriel Manchim'
    })
})

app.get('*',(req, res) => {
    res.render('404',{
        title: '404',
        errorMessage: '404 Page NotFound',
        name: 'Gabriel Manchim',

    })
})

//Start Server on Port 3000
app.listen(port, () => {
    console.log('server is up on port ' + port)
})