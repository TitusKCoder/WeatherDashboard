
$(document).ready(function(){
    // Assign global variables 
let searchBtn = $("#searchBtn");
let searchBox = $(".SearchBox")
let textBox = $("#textBox");
let currentDay = $("#currentForcast");
let futureForcast = $("#futureForcast");
let searchHistory = $("#searchHistory");
let storage = window.localStorage;
let searchCount = storage.length;
   
// searches local storage on refresh for any past searches
    if(storage.length > 0){
        console.log('Getting prev cities')
    for(i=0; i < storage.length; i++){
        let num = i +1;

        let input =storage.getItem('city'+num);
        console.log(input + ' is already in mempory')
        if(input){
        city = document.createTextNode(input);

        let pastCityBtn = document.createElement("button");
        let pastCityTxt = document.createElement("a");
        pastCityTxt.classList.add('historyBtn');
        pastCityTxt.setAttribute('id', input);
        pastCityTxt.appendChild(city);
        pastCityBtn.appendChild(pastCityTxt);
        searchHistory[0].appendChild(pastCityBtn);}
    }}

        // code for clicking on a previous city button
        let prevCity = $('.historyBtn');

        prevCity.unbind('click').on('click', function () {
            let input = this.id;
            if(currentDay.is(':empty')){
                console.log("empty");
            }
            else{
                console.log('Not empty')
                currentDay.empty();
                futureForcast.empty();
            }
    
            let currentWebsite = "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&units=imperial&appid=5d6a70ef1c3ad02bc5b5330b210fe0f4";
        
        if(input){
            console.log("current day fetch start");
            fetch(currentWebsite)
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
                let dateEl = document.createElement("h2");
                let cityNameEl = document.createElement("h1");
                let tempratureEl = document.createElement("p");
                let humidityEl = document.createElement("p");
                let windSpeedEl = document.createElement("p");
                let logoEl = document.createElement("image");
    
                // fetch UV index data and 5 day forcast
               fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly,alerts&units=imperial&appid=5d6a70ef1c3ad02bc5b5330b210fe0f4")
               .then(response => response.json())
               .then(function(fetch2){
                   console.log(fetch2);
                   console.log("fetch 2 worked");
                let uvIndex = fetch2.current.uvi;
    
                let uvIndexEl = document.createElement("p");
                
                // display current weather data on HTML
                let text;
    
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
                
            //    })
                
                text = document.createTextNode(cityName);
                cityNameEl.appendChild(text);
                currentDay[0].appendChild(cityNameEl);
    
                text= document.createTextNode(date);
                dateEl.appendChild(text);
                currentDay[0].appendChild(dateEl);
    
                text = document.createTextNode("Temprature: " + temprature + "°F");
                tempratureEl.appendChild(text);
                currentDay[0].appendChild(tempratureEl);
    
                text = document.createTextNode("Wind Speed: " + windSpeed + "MPH");
                windSpeedEl.appendChild(text);
                currentDay[0].appendChild(windSpeedEl);
    
                text = document.createTextNode("Humidity: " + humidity + "%");
                humidityEl.appendChild(text);
                currentDay[0].appendChild(humidityEl);
    
                currentDay[0].appendChild(uvIndexEl);
    
                // display future 5 days 
                for(i=1; i < fetch2.daily.length - 2; i++) {
                    console.log("cycle: day " + i) 
                    // create forcast box and add needed elements 
                    let data;
    
                    let date = moment().add(i, 'days').format("MMMM Do YYYY");
                    let icon = fetch2.daily[i].weather[0][3];
                    let temprature= fetch2.daily[i].temp.day;
                    let windSpeed = fetch2.daily[i].wind_speed;
                    let humidity= fetch2.daily[i].humidity;
    
                    let weatherbox = document.createElement("div");
                    let dateEl = document.createElement("h2");
                    let tempratureEl = document.createElement("p");
                    let humidityEl = document.createElement("p");
                    let windSpeedEl = document.createElement("p");
    
                    data = document.createTextNode(date);
                    dateEl.appendChild(data);
                    weatherbox.appendChild(dateEl);
    
                    data = document.createTextNode("Temprature: " + temprature + "°F");
                    tempratureEl.appendChild(data);
                    weatherbox.appendChild(tempratureEl);
    
                    data = document.createTextNode("Humidity: " + humidity);
                    humidityEl.appendChild(data);
                    weatherbox.appendChild(humidityEl);
    
                    data = document.createTextNode(windSpeed);
                    windSpeedEl.appendChild(data);
                    weatherbox.appendChild(windSpeedEl);
    
                    futureForcast[0].appendChild(weatherbox);
                }
            })
            })
        }
    
    
        })
    


let searchCityBtn = function() {


    // checks if weather data is on the page. Will empty data if true 
    if(currentDay.is(':empty')){
        console.log("empty");
    }
    else{
        console.log('Not empty')
        currentDay.empty();
        futureForcast.empty();
    }

    // saves search to local storage, and adds search to page as button
    let city;
    let input = textBox.val();

    city = document.createTextNode(input);
    searchCount++
    storage.setItem("city" + searchCount , input);

    let pastCityBtn = document.createElement("button");
    let pastCityTxt = document.createElement("a");
    pastCityTxt.classList.add('historyBtn');
    pastCityTxt.setAttribute('id', input);
    pastCityTxt.appendChild(city);
    pastCityBtn.appendChild(pastCityTxt);
    searchHistory[0].appendChild(pastCityBtn);

    // code for clicking on a previous city button
    let prevCity = $('.historyBtn');

    prevCity.unbind('click').on('click', function () {
        let input = this.id;
        if(currentDay.is(':empty')){
            console.log("empty");
        }
        else{
            console.log('Not empty')
            currentDay.empty();
            futureForcast.empty();
        }

        let currentWebsite = "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&units=imperial&appid=5d6a70ef1c3ad02bc5b5330b210fe0f4";
    
    if(input){
        console.log("current day fetch start");
        fetch(currentWebsite)
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
            let dateEl = document.createElement("h2");
            let cityNameEl = document.createElement("h1");
            let tempratureEl = document.createElement("p");
            let humidityEl = document.createElement("p");
            let windSpeedEl = document.createElement("p");
            let logoEl = document.createElement("image");

            // fetch UV index data and 5 day forcast
           fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly,alerts&units=imperial&appid=5d6a70ef1c3ad02bc5b5330b210fe0f4")
           .then(response => response.json())
           .then(function(fetch2){
               console.log(fetch2);
               console.log("fetch 2 worked");
            let uvIndex = fetch2.current.uvi;

            let uvIndexEl = document.createElement("p");
            
            // display current weather data on HTML
            let text;

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
            
        //    })
            
            text = document.createTextNode(cityName);
            cityNameEl.appendChild(text);
            currentDay[0].appendChild(cityNameEl);

            text= document.createTextNode(date);
            dateEl.appendChild(text);
            currentDay[0].appendChild(dateEl);

            text = document.createTextNode("Temprature: " + temprature + "°F");
            tempratureEl.appendChild(text);
            currentDay[0].appendChild(tempratureEl);

            text = document.createTextNode("Wind Speed: " + windSpeed + "MPH");
            windSpeedEl.appendChild(text);
            currentDay[0].appendChild(windSpeedEl);

            text = document.createTextNode("Humidity: " + humidity + "%");
            humidityEl.appendChild(text);
            currentDay[0].appendChild(humidityEl);

            currentDay[0].appendChild(uvIndexEl);

            // display future 5 days 
            for(i=1; i < fetch2.daily.length - 2; i++) {
                console.log("cycle: day " + i) 
                // create forcast box and add needed elements 
                let data;

                let date = moment().add(i, 'days').format("MMMM Do YYYY");
                let icon = fetch2.daily[i].weather[0][3];
                let temprature= fetch2.daily[i].temp.day;
                let windSpeed = fetch2.daily[i].wind_speed;
                let humidity= fetch2.daily[i].humidity;

                let weatherbox = document.createElement("div");
                let dateEl = document.createElement("h2");
                let tempratureEl = document.createElement("p");
                let humidityEl = document.createElement("p");
                let windSpeedEl = document.createElement("p");

                data = document.createTextNode(date);
                dateEl.appendChild(data);
                weatherbox.appendChild(dateEl);

                data = document.createTextNode("Temprature: " + temprature + "°F");
                tempratureEl.appendChild(data);
                weatherbox.appendChild(tempratureEl);

                data = document.createTextNode("Humidity: " + humidity);
                humidityEl.appendChild(data);
                weatherbox.appendChild(humidityEl);

                data = document.createTextNode(windSpeed);
                windSpeedEl.appendChild(data);
                weatherbox.appendChild(windSpeedEl);

                futureForcast[0].appendChild(weatherbox);
            }
        })
        })
    }


    })







    let currentWebsite = "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&units=imperial&appid=5d6a70ef1c3ad02bc5b5330b210fe0f4";
    
    if(input){
        console.log("current day fetch start");
        fetch(currentWebsite)
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
            let dateEl = document.createElement("h2");
            let cityNameEl = document.createElement("h1");
            let tempratureEl = document.createElement("p");
            let humidityEl = document.createElement("p");
            let windSpeedEl = document.createElement("p");
            let logoEl = document.createElement("image");

            // fetch UV index data and 5 day forcast
           fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly,alerts&units=imperial&appid=5d6a70ef1c3ad02bc5b5330b210fe0f4")
           .then(response => response.json())
           .then(function(fetch2){
               console.log(fetch2);
               console.log("fetch 2 worked");
            let uvIndex = fetch2.current.uvi;

            let uvIndexEl = document.createElement("p");
            
            // display current weather data on HTML
            let text;

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
            
        //    })
            
            text = document.createTextNode(cityName);
            cityNameEl.appendChild(text);
            currentDay[0].appendChild(cityNameEl);

            text= document.createTextNode(date);
            dateEl.appendChild(text);
            currentDay[0].appendChild(dateEl);

            text = document.createTextNode("Temprature: " + temprature + "°F");
            tempratureEl.appendChild(text);
            currentDay[0].appendChild(tempratureEl);

            text = document.createTextNode("Wind Speed: " + windSpeed + "MPH");
            windSpeedEl.appendChild(text);
            currentDay[0].appendChild(windSpeedEl);

            text = document.createTextNode("Humidity: " + humidity + "%");
            humidityEl.appendChild(text);
            currentDay[0].appendChild(humidityEl);

            currentDay[0].appendChild(uvIndexEl);

            // display future 5 days 
            for(i=1; i < fetch2.daily.length - 2; i++) {
                console.log("cycle: day " + i) 
                // create forcast box and add needed elements 
                let data;

                let date = moment().add(i, 'days').format("MMMM Do YYYY");
                let icon = fetch2.daily[i].weather[0][3];
                let temprature= fetch2.daily[i].temp.day;
                let windSpeed = fetch2.daily[i].wind_speed;
                let humidity= fetch2.daily[i].humidity;

                let weatherbox = document.createElement("div");
                let dateEl = document.createElement("h2");
                let tempratureEl = document.createElement("p");
                let humidityEl = document.createElement("p");
                let windSpeedEl = document.createElement("p");

                data = document.createTextNode(date);
                dateEl.appendChild(data);
                weatherbox.appendChild(dateEl);

                data = document.createTextNode("Temprature: " + temprature + "°F");
                tempratureEl.appendChild(data);
                weatherbox.appendChild(tempratureEl);

                data = document.createTextNode("Humidity: " + humidity);
                humidityEl.appendChild(data);
                weatherbox.appendChild(humidityEl);

                data = document.createTextNode(windSpeed);
                windSpeedEl.appendChild(data);
                weatherbox.appendChild(windSpeedEl);

                futureForcast[0].appendChild(weatherbox);
            }
        })
        })
    }
}
// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
searchBtn.click(searchCityBtn)


})