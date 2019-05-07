const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();
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
        title: 'Weather App',
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
    res.send({
        forecast: 'It is 50 degrees.',
        location: 'Seattle'
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

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});