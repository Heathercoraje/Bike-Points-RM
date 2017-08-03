var formSubmit = document.querySelector('form');
var numOfBikesElement = document.querySelector('#numOfAvailiableBikes');
var formInput = document.querySelector('#bikeStationInput')
var numOfEmptyDocksElement = document.querySelector('#numOfEmptyDocks');
var result = document.querySelector('#result');

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
  if (numOfBikes === undefined) {
    numOfBikesElement.innerText = 'N/A';
    numOfEmptyDocksElement.innerText = 'N/A';
  } else {
    numOfBikesElement.innerText = numOfBikes;
    numOfEmptyDocksElement.innerText = numOfEmptyDocks;
  }
}

function renderAuto(loadEvent, inputString) {
  var nameResponseText = loadEvent.currentTarget.responseText
  var parsedSuggestions = JSON.parse(nameResponseText).suggestions;
  var suggestions = document.createElement('datalist');
  suggestions.setAttribute('id', 'suggestions');
  if (parsedSuggestions !== 0) {
    parsedSuggestions.forEach(function(element) {
      var nameNode = document.createElement('option');
      nameNode.innerText = element;
      suggestions.appendChild(nameNode);
    })
  } else {
    while(suggestions.firstChild) {
      suggestions.removeChild(suggestions.firstChild)
    }
  }
  result.replaceChild(suggestions, result.firstChild)

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
