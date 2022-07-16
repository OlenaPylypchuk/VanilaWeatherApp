function displayTemperature (response) {
let skyElement = document.querySelector ("#cleared");
skyElement.innerHTML = (response.data.weather[0].description);

let temperature = document.querySelector ("#todayTemperature");
temperature.innerHTML = Math.round(response.data.main.temp);
let windElement = document.querySelector ("#wind");
windElement.innerHTML = (response.data.wind.speed);
let humidityElement = document.querySelector ("#humidity");
humidityElement.innerHTML = (response.data.main.humidity);
console.log (response.data)

}

let apiKey ="2b253ae4d48093bcb55a56d6a42d8fa1";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${apiKey}&units=metric`;


axios.get(apiUrl).then(displayTemperature);






































