const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000;


var app = express();

//registr the use of partials
hbs.registerPartials(__dirname + '/views/partials')
//set the templating engine as hbs
app.set('view engine','hbs');
//set the default public dir for accessing files to be served e.g. .html files
app.use(express.static(__dirname + '/public'))

app.use((req ,res ,next ) => {
    var now = new Date().toString();    
    
    console.log(`${now} - ${req.method} - ${req.url} - ${res.statusCode}`);
    next();

});

// //middlware for the maintenance page
// app.use((req, res, next) => {
//     res.render('maintenance.hbs',{
//         pageTitle: 'Gone fishing!!',
//         websiteTitle: 'My New Website - ' 
//     })
// })

//set the default public dir for accessing files to be served e.g. .html files
app.use(express.static(__dirname + '/public'))


hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/',(req, resp) => {
    //resp.send('<h1>Hello express!<h1>');
    //create home.hbs - welcome message with the other variables
    resp.render('home.hbs', {
        pageTitle: 'Home page',
        websiteTitle: 'My New Website - ',   
        welcomeMessage: 'Welcome to my new Express.js powered site!!'
    })
})
app.get('/about',(req,res) => {
    res.render('about.hbs',{
        pageTitle: 'About page'

    })
});

// /bad  - send back JSON with errorMessage
app.get('/bad', (req ,res) => {
    res.send({
        errorMessage: ' Some kinda error'
    });
});

app.get('/maintenance', (req,res) => {
    res.render('maintenance.hbs',{
        pageTitle: 'Gone fishing!!',
        websiteTitle: 'My New Website - '   
        
    })

})

app.listen(port, () =>{
    console.log(`Server is up on port ${port}.`)
});
