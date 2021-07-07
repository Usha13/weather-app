const request = require('request');

const geocode = (address, callback) =>{
 
    const url ="https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address)  +".json?limit=1&access_token=pk.eyJ1IjoidXNoYTEzIiwiYSI6ImNrcXFnd2NqMTBlczIybnEzcjZvaWw2cmsifQ.H3tbUy7NtjJFZBB3u6ivpQ";

    request({url, json: true} , (error, {body})=> {
        if(error)
        {
            callback("Unable to connect the service", undefined);
        }
        else if(body.features.length === 0)
        {
            callback("Unable to find location", undefined);
        }
        else{
            const long = body.features[0].center[0];
            const lat = body.features[0].center[1];
            const place = body.features[0].place_name;
        callback(undefined,{
            long,
            lat,
            place
        });   
        }  
        })
}

module.exports = geocode;