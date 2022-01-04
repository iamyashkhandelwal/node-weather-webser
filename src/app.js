const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars and Views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Yash Khandelwal'
    })
})

// app.com/about
app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Yash Khandelwal'
    });
})

//app.com/help
app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Yash Khandelwal'
    })
})

//app.com/weather
app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'Please provide address'
        })
    }

    const address = req.query.address;
    geocode(address, (error, data) => {
        // console.log(data);
        if(error){
            return res.send({
                error
            })
        }

        forecast(data, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            // console.log('forecastData: ', forecastData);              
            res.send({
                forecast: forecastData,
                location: data.Location,
                address
            });
        })
    })

    // console.log(req.query.address);
    // res.send({
    //     location: req.query.address,
    //     forecast: '10 degree'
    // });
    
})

app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({
            error: 'Provide search term'
        })
    }
    
    console.log(req.query.search);
    res.send({
        products: []
    })   
})


app.get('/help/*', (req,res) => {
    // res.send('Help article not found!');
    res.render('404', {
        title: '404',
        name: 'Yash Khandelwal',
        error: 'Help page not found!'
    });
})

//* => wild card character
app.get('*', (req,res) => {
    // res.send('404 Page');
    // res.sendStatus(404);
    res.render('404', {
        title: '404',
        name: 'Yash Khandelwal',
        error: 'Page not found!'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
})