fetch('https://opentdb.com/api.php?amount=15&category=20&type=multiple')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    $('#start').on('click', function() {
      console.log(data.results[0].question);
      });

    })
  .catch(function(error) {
  });
