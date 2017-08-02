var formSubmit = document.querySelector('form');
var formInput = document.querySelector('#bikeStationInput')
var numOfBikesElement = document.querySelector('#numOfBikes');
var numOfEmptyDocksElement = document.querySelector('#numOfEmptyDocks');

function fetchData(url, callback) {
  var xhr = new XMLHttpRequest(); //create xhr request
  xhr.addEventListener('load', function() {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      return callback(response);
    }
  });
  xhr.open('Post', url);
  xhr.send();
}

function render (response) {
  var numOfBikes = response.numOfBikes;
  var numOfEmptyDocks = response.numOfEmptyDocks;
  numOfBikesElement.innerText = numOfBikes;
  numOfEmptyDocksElement.innerText = numOfEmptyDocks;
} 

formSubmit.addEventListener('submit', function(event) {
  event.preventDefault(); //stops reloading page on return
  var searchInput = event.target[0].value.toLowerCase().trim(); //gets the value of the search input
  var url = '/search?q=' + searchInput // create url with search input
  fetchData(url, render) // this function calls the render function
});

formInput.addEventListener('input', function(event) {
  var inputString = event.target.value.toLowerCase().trim();
  var url = '/auto?q=' + inputString;
  var xhr = new XMLHttpRequest(); //create new xhr request
  xhr.open('GET', url); //open GET request
  xhr.send(); // send request
  xhr.addEventListener('load', function(loadEvent) {
    renderAuto(loadEvent, inputString);
  });
})
