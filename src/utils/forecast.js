const request = require('request');

const weather = (long, lat, callback) =>{
    const url="https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=16f456c42cc5df36dc78a540dfbad66d&units=metric";

   request({url, json: true} , (error, {body})=> {
       if(error)
       {
           callback("Unable to connect the service", undefined)
       }
       else if(body.cod == 404)
       {
           callback(body.message, undefined)
       }
       else if(body.cod == 400)
       {
           callback(body.message, undefined)
       }
       else{
           callback(undefined, body)
       }
       
   })
}


module.exports = weather;