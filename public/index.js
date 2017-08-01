var formSubmit = document.querySelector('form');

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

formSubmit.addEventListener('submit', function(event) {
  event.preventDefault(); //stops reloading page on return
  var searchInput = event.target[0].value.toLowerCase().trim(); //gets the value of the search input
  var url = '/search?q=' + searchInput // create url with search input
  fetchData(url, function(response) {
    console.log(response);
  })
})
