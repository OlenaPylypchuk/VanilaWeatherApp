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

    function formatDay (timestamp) {
    let date = new Date (timestamp * 1000); 
    let day = date.getDay();
    let days = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
    }

    function displayForecast (response) {
      console.log (response.data.daily);
      let forecast = response.data.daily;
       
   let forecastElement = document.querySelector("#forecast");
   let days = ["Sat", "Sun", "Mon", "Tue", "Wed"];
   let forecastHTML = `<div class="row">`;
   
    forecast.forEach(function (forecastDay, index) {
    if (index <6 )  {
    forecastHTML =
      forecastHTML + `
    <div class="col-2" id="forecast-one-day">
      <div class="forecast-date"> ${formatDay(forecastDay.dt)} </div>
      <img 
      src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}.png" alt="" width = "36" />
        <div class="forecast-temperature">
        <span class="forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}˚ </span> 
        <span class="forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}˚ </span>
        </div>              
    </div> `;}
   });
   
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;   
    
    }

    function getForecast (coordinates){
      console.log (coordinates);
      let key = "2b253ae4d48093bcb55a56d6a42d8fa1";
      let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${key}&units=metric`;
      
      axios.get(apiUrl).then(displayForecast);
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

celsiumTemp = response.data.main.temp;

let temperature = document.querySelector ("#todayTemperature");
temperature.innerHTML = Math.round(response.data.main.temp);

let windElement = document.querySelector ("#wind");
windElement.innerHTML = (response.data.wind.speed);

let humidityElement = document.querySelector ("#humidity");
humidityElement.innerHTML = (response.data.main.humidity);

getForecast (response.data.coord);

console.log (response.data);

}



function search (city) {
let apiKey ="2b253ae4d48093bcb55a56d6a42d8fa1";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit (event) {
event.preventDefault();
let cityInputElement = document.querySelector ("#enterCity");
console.log (cityInputElement.value);
search (cityInputElement.value);
}


let form = document.querySelector("#search");
form.addEventListener ("submit", handleSubmit);


function pickFahrenheit(event) {
event.preventDefault();
let fahrTemp = (celsiumTemp * 9) / 5 + 32;
let temperatureElement = document.querySelector ("#todayTemperature");
temperatureElement.innerHTML = Math.round(fahrTemp);
celsius.classList.remove ("active");
fahrenheit.classList.add("active") ;        
}



let celsiumTemp = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", pickFahrenheit);

function pickCelsius (event) {
event.preventDefault();
let temperatureElement = document.querySelector ("#todayTemperature");
temperatureElement.innerHTML = Math.round(celsiumTemp);
fahrenheit.classList.remove ("active");
celsius.classList.add("active") ;           
}

let celsius = document.querySelector("#celsium");
celsius.addEventListener("click", pickCelsius);


search ("New York");


























