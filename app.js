fetch('https://opentdb.com/api.php?amount=15&category=20&type=multiple')
  .then(function(response) {
    //Turns the the JSON into a JS object
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    $('#start').on('click', function()  {
      data.results.forEach(function(element)  {
        console.log(element.question);
      });
    });
  })
  .catch(function(error){
  });
