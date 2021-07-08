const express = require('express')
const request = require('request')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicdir = path.join(__dirname, '../public')
const viewdir = path.join(__dirname, '../templates/views')
const partialdir = path.join(__dirname, '../templates/partials')

const app = express()
const port = process.env.PORT || 3000


app.set('view engine','hbs')
app.set('views', viewdir)


hbs.registerPartials(partialdir)
app.use(express.static(publicdir))


app.get('',(req, res) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    todaydate = dd + '/' + mm + '/' + yyyy;

    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    todayday = days[today.getDay()];

    res.render('index',{
        'day' : todayday,
        'date' : todaydate,
    })
 })

 app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About'
    })
 })

 app.get('/help',(req, res) => {
    res.render('help',{
        title: 'Help'
    })
 })
 app.get('/contact',(req, res) => {
    res.render('contact',{
        title: 'contact'
    })
 })

 app.get('/photos',(req, res) => {
    res.render('photos',{
        title: 'Photos'
    })
 })

 app.get('/weather',(req, res) => {
    if(!req.query.address)
    {
       return res.send({
            "error": "please provide a address"
        })
    }

    geocode(req.query.address, (error1, {long,lat,place}={})=> {
        if(error1){
            return res.send({
                "error": error1
            })
        }
        else{
            forecast(long, lat , (error2,{weather,main,base,wind}={})=> {
                if(error2)
                    return res.send({
                        "error": error2
                    })
                else                    
                    return res.send({
                       
                        'Search Address' : req.query.address,
                        'Location' : place,
                        'Weathermain' : weather[0].main ,
                        "wdesc" : weather[0].description ,
                        'Temparature' : main.temp,
                        'Humidity' : main.humidity,
                        "temp_min" : main.temp_min,
                        "temp_max" : main.temp_max,
                        "pressure" : main.pressure,
                        "wind" : wind.speed
                    })
            })
        }
        
    
    })
  
 })



 app.get('*',(req, res) => {
    res.render('404',{
        title: 'Error 404'
    })
 })




app.listen(port , ()=> {
    console.log("server is running on port 3000")
})