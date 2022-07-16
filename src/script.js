function formateDate (timestamp) {
    let date = new Date (timestamp);
    
    let days = ["Sunday", "Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    let dayOfMonth = date.getDate();
    if (dayOfMonth<10) {
       dayOfMonth = (`0${dayOfMonth}`) 
    }
     let month = (date.getMonth())+1;
     if (month<10){
         month = (`0${month}`)
     }
     let year = date.getFullYear();
    return `${day}, ${dayOfMonth}.${month}.${year}`;
    
    }
    function formateTime (timestamp) {
    let date = new Date (timestamp);
    let hours = date.getHours();
    if (hours <10) {
        hours = (`0${hours}`)
    }
    let minutes = date.getMinutes();
     if (minutes <10) {
        minutes = (`0${minutes}`)
    }

    
    return `${hours}:${minutes}`;
   
    
    }

function displayTemperature (response) {
    let cityLocation = document.querySelector ("#citylocation");
    let cityDisplay = response.data.name;
    let countryDisplay = response.data.sys.country;
    cityLocation.innerHTML = (`${cityDisplay}, ${countryDisplay} `);
let dateElement = document.querySelector ("#date");
dateElement.innerHTML = formateDate (response.data.dt * 1000);

let timeElement = document.querySelector ("#currentTime");
timeElement.innerHTML = formateTime (response.data.dt * 1000);


let skyElement = document.querySelector ("#cleared");
skyElement.innerHTML = (response.data.weather[0].description);

let iconElement = document.querySelector ("#icon");
let iconcode = (response.data.weather[0].icon);
iconElement.setAttribute ("src", `http://openweathermap.org/img/wn/${iconcode}.png`);
iconElement.setAttribute ("alt", response.data.weather[0].description)

let temperature = document.querySelector ("#todayTemperature");
temperature.innerHTML = Math.round(response.data.main.temp);

let windElement = document.querySelector ("#wind");
windElement.innerHTML = (response.data.wind.speed);

let humidityElement = document.querySelector ("#humidity");
humidityElement.innerHTML = (response.data.main.humidity);

console.log (response.data)

}
let city = "Kherson";
let apiKey ="2b253ae4d48093bcb55a56d6a42d8fa1";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


axios.get(apiUrl).then(displayTemperature);






































