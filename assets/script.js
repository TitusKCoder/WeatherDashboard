
$(document).ready(function(){
console.log("ready");
    // Assign global variables 
let searchBtn = $("#searchBtn");
let searchBox = $(".SearchBox")
let textBox = $("#textBox");
let currentDay = $("#currentForcast");
let futureForcast = $("#futureForcast");
let searchHistory = $("#searchHistory");


// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
searchBtn.click(function() {
    let input = textBox.val();
    let website = "http://api.openweathermap.org/data/2.5/weather?q=" + input + "&units=imperial&appid=302ad37fa1a08f4e45663c5649a34fb1";
    
    if(input){
        console.log("fetch start");
        fetch(website)
        .then(response => response.json())
        // For the current weather
        .then(function(result){
            // Assign current weather data to variables
            let temprature = result.main.temp;
            let cityName = result.name;
            let date = moment().format("MMMM Do YYYY");
            let logo = result.weather.icon;
            let humidity = result.main.humidity;
            let windSpeed = result.wind.speed;
            let latitude = result.coord.lat;
            let longitude = result.coord.lon;

            // variables needed to create elements on HTML
            let cityNameEl = document.createElement("h1");
            let tempratureEl = document.createElement("p");
            let humidityEl = document.createElement("p");
            let windSpeedEl = document.createElement("p");
            let logoEl = document.createElement("image");

            // fetch UV index data 
           fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly,daily,alerts&appid=302ad37fa1a08f4e45663c5649a34fb1")
           .then(response => response.json())
           .then(function(fetch2){
            let uvIndex = fetch2.current.uvi;

            let uvIndexEl = document.createElement("p");
            
            text = document.createTextNode("UV Index: " + uvIndex);
            uvIndexEl.appendChild(text);
            if(uvIndex < 2) {
                uvIndexEl.classList.add("favorable");
            }
            else if(uvIndex >= 2 && uvIndex < 6){
                uvIndexEl.classList.add("moderate");
            }
            else {
                uvIndexEl.classList.add("severe")
            }
            currentDay[0].appendChild(uvIndexEl);
           })
            // display current weather data on HTML
            let text;

            text = document.createTextNode(cityName);
            cityNameEl.appendChild(text);
            currentDay[0].appendChild(cityNameEl);

            text = document.createTextNode("Temprature: " + temprature + "°F");
            tempratureEl.appendChild(text);
            currentDay[0].appendChild(tempratureEl);

            text = document.createTextNode("Wind Speed: " + windSpeed + "MPH");
            windSpeedEl.appendChild(text);
            currentDay[0].appendChild(windSpeedEl);

            text = document.createTextNode("Humidity: " + humidity + "%");
            humidityEl.appendChild(text);
            currentDay[0].appendChild(humidityEl);

            
            







        })
    }
})

})