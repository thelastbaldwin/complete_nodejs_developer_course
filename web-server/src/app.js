const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Steve Minor'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Steve Minor'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Steve Minor',
        message: 'You\'re on your own'
    });
});

app.get('/weather', (req, res) => {
    const {
        address
    } = req.query;

    if(!address){
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(address, (error, {lat, long, location} = {}) => {
        if(error){
            return res.send({
                error
            });
        } else {
            forecast(lat, long, (error, forecastData) => {
                if(error){
                    return res.send({
                        error
                    });
                } else {
                    const {
                        summary,
                        temperature,
                        precipProbability
                    } = forecastData;

                    res.send({
                        forecast: forecastData,
                        location,
                        address
                    });
                }
            });
        }
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Page not found!',
        name: 'Steve Minor',
        message: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found!',
        name: 'Steve Minor',
        message: 'Whoops!'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});