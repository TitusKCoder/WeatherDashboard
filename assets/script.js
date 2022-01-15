// Assign elements to global variables
let searchBtn = $("#searchBtn");
let textBox = $("#textBox");
let currentDay = $("#currentForcast");
let futureForcast = $("#futureForcast");
let searchHistory = $("#searchHistory");



$(document).ready(function(){

// Add click event for city search
searchBtn.click = function() {
    let input = textBox.val();
    console.log("worked");
};

})