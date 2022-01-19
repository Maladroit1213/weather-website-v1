const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//const weatherData = require("./pathToMyFile.json");
// app.get((req, res) => {
//     req.send(weatherData);
// });

//const hbs = require('hbs')

//console.log(__dirname)          //contains path where current script lives in
//console.log(path.join(__dirname,'../public'))         //sets path to index.html

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')   //express by default looks for templates in'/views' folder but can explicitly state where to look.
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')     //sets up handlebars templates. tell express which templating engine we installed
app.set('views', viewsPath)         // express expects all views(handlebar templates) to live in default 'views' folder in project's root directory. in this case weather-app.
hbs.registerPartials(partialsPath)


// Set up static directory to serve
app.use(express.static(publicDirectoryPath))   //way to customise server. static takes path to index.html

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather woowoo!',
        name: 'Enjoyed by Mike'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About da hotties',
        name: 'Licked by Mike'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some good times. :)',
        title: 'Helpin da ladies',
        name: 'Loved by Mike'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({   //use return here to ensure it doesn't run anything after it which would cause 2 sends and throw out error: Cannot set headers after they are sent to the client
            error: 'You must provide an address'
        })
    }

    console.log(req.query.address)

    let queryLocation = req.query.address

    if (queryLocation) {
        geocode(queryLocation, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({error})
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
                console.log(location)
                console.log(forecastData)

                res.send({
                    location,
                    forecast: forecastData,
                    address: req.query.address
                })
            })
        })
    } else {
        console.log('Please enter a location')
    }

})

// app.get('/products', (req, res) => {

//     if (!req.query.search) {
//         return res.send({   //use return here to ensure it doesn't run anything after it which would cause 2 sends and throw out error: Cannot set headers after they are sent to the client
//             error: 'You must provide a search term'
//         })
//     }

//     console.log(req.query.search)

//     res.send({
//         products: []
//     })

// })

app.get('/help/*', (req, res) => {     // Used to give error on any unspecified page. here iot's for url off help.
    res.render('page404', {
        title: '404',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {     //important this is last as using * wildcard so need to make sure all legit pages are picked up FileSystemDirectoryEntry.
    res.render('page404', {
        title: '404',
        errorMessage: 'Page not found'
    })
})
// app.get('', (req, res) => {     //This won't get sent now as it's getting served from above
//     res.send('<h1>WeatherWow</h1>')  //if request is from browser, this is what's sent back to browser window
//})                                  //this let's us configure what server should do when someone tries to get resource at specified url.
// get method takes 2 args, first is route(partial url), 2nd arg is fn. Fn is what we want to do when someone takes route (1st arg)
//fn has 2 args. first is object containing request information (req). 2nd is the response, contains methods customising what we send back to requestor (res)

// app.get('/help', (req, res) => {
//     res.send({
// name: 'Mike',
// age: 37
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>All about what?</h1>')
// })



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})                            //this starts up server. port 3000 is common development port. 2nd arg is optional and is callback function which just runs when the server is up and running
