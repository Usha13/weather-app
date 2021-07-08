console.log("js added")



let frm = document.querySelector('form');
let search = document.querySelector('input');

let er = document.getElementById('error');
let ft = document.getElementsByClassName('forecast-container');
let errormsg = document.getElementsByClassName('error-msg');
let msg1 = document.getElementById('msg1');
let msg2 = document.getElementById('msg2');

let place = document.getElementById('place');
let temp = document.getElementById('temp');
let main = document.getElementById('main');
let desc = document.getElementById('desc');
let temp_min = document.getElementById('temp_min');
let temp_max = document.getElementById('temp_max');
let prs = document.getElementById('prs');
let humidity = document.getElementById('humidity');
let wind = document.getElementById('wind');

frm.addEventListener('submit', (e)=> {
    e.preventDefault();
    const lc = search.value;
    console.log(lc)

    fetch('/weather?address='+lc).then((response)=> {
    response.json().then((data)=> {
            console.log(data);
            if(data.error)
            {
                msg1.innerHTML ="";
                ft[0].style.display ="none";
                errormsg[0].style.display ="block";
                er.innerHTML = data.error
            }
            else
            {
                er.innerHTML= "";
                ft[0].style.display ="block";
                errormsg[0].style.display ="none";
                place.innerHTML = data.Location;
                temp.innerHTML = data.Temparature;
                main.innerHTML = data.Weathermain;
                desc.innerHTML = data.wdesc;
                temp_min.innerHTML = data.temp_min;
                temp_max.innerHTML = data.temp_max;
                prs.innerHTML = data.pressure;
                humidity.innerHTML = data.Humidity;
                wind.innerHTML = data.wind;
                // msg1.innerHTML = "Location: "+data.Location+ "<br> Weather: "+data.Weather+ "<br> Temparature: "+data.Temparature+ "<br> Humidity: "+data.Humidity;
            }
        })
    })

})