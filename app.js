/* console.log(data.results[0].question);
console.log(data.results[0].incorrect_answers[0]);
console.log(data.results[0].incorrect_answers[1]);
console.log(data.results[0].incorrect_answers[2]);
console.log(data.results[0].correct_answer);
console.log(data.results[0].difficulty);
console.log(data.results[0].category);*/

fetch('https://opentdb.com/api.php?amount=15&category=20&type=multiple')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    var counter = 0;
    $('#start').on('click', function() {
      // poner las alternativas en un arreglo
      var alternatives = [];
      alternatives.push(data.results[0].incorrect_answers[0]);
      alternatives.push(data.results[0].incorrect_answers[1]);
      alternatives.push(data.results[0].incorrect_answers[2]);
      alternatives.push(data.results[0].correct_answer);
      // ordenarlas para que la respuesta correcta no esté siempre en la misma posición
      alternatives.sort();
      // si la respuesta está correcta
      console.log(data.results[counter].question);
      counter++;
    });
  })
  .catch(function(error) {
  });
