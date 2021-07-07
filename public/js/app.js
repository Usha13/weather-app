console.log("js added")



let frm = document.querySelector('form');
let search = document.querySelector('input');

let er = document.getElementById('error');
let msg1 = document.getElementById('msg1');
let msg2 = document.getElementById('msg2');

frm.addEventListener('submit', (e)=> {
    e.preventDefault();
    const lc = search.value;
    console.log(lc)

    fetch('http://localhost:3000/weather?address='+lc).then((response)=> {
    response.json().then((data)=> {
            console.log(data);
            if(data.error)
            {
                msg1.innerHTML ="";
                er.innerHTML = data.error
            }
            else
            {
                er.innerHTML= "";
                msg1.innerHTML = "Location: "+data.Location+ "<br> Weather: "+data.Weather+ "<br> Temparature: "+data.Temparature+ "<br> Humidity: "+data.Humidity;
            }
        })
    })

})