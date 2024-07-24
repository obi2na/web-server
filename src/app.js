const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

//setup directories
const publicDirectPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, './partials');

//setup handlebars engine
app.set('view engine', 'hbs');

//set views path for partials used by express
hbs.registerPartials(partialsPath);

//use directory to serve up static content
app.use(express.static(publicDirectPath));

//serve up dynamic html page using hbs
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'John Doe'
    });
});



app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        helpText: 'This is some helpful text',
        name: 'John Doe'
    });
});


app.get('/help/*', (req, res) => {
    res.render('help404', {
        errorMessage: 'Help article not found'
    });
});


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about',
        name: 'John Doe'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address)
        return res.send({
            error: 'an address must be provided'
        });

    geocode(req.query.address, (geocodeError, geocodeData) => {
        if(geocodeError)
            return res.send({geocodeError});
        else {
            forecast(geocodeData, (forecastError, forecastData) => {
                if(forecastError)
                    return res.send({forecastError});

                return res.send(forecastData);
            });
        }


    });

});


//set up handler for 404 page
app.get('*', (req, res) => {
    res.render('NotFound', {
        errorMessage: 'Page not found'
    });
});


app.listen(port, () => console.log('Server started on port 3000'));
