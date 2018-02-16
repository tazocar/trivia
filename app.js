fetch('https://opentdb.com/api.php?amount=15&category=20&type=multiple')
  .then(function(response) {
    //Turns the the JSON into a JS object
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  });
