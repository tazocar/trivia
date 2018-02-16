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
    let counter = 0;
    $('#start').on('click', function() {
      $('.container').html('');
      // poner las alternativas en un arreglo
      var alternatives = [];
      alternatives.push(data.results[counter].incorrect_answers[0]);
      alternatives.push(data.results[counter].incorrect_answers[1]);
      alternatives.push(data.results[counter].incorrect_answers[2]);
      alternatives.push(data.results[counter].correct_answer);
      // ordenarlas para que la respuesta correcta no esté siempre en la misma posición
      alternatives.sort();
      // crear elementos
      let question = $('<h2 class="question">').text(`${data.results[counter].question}`);
      $('.container').append(question);
      let alternativesDisplay = alternatives.forEach(function(element) {
        $('.container').append(`<a class="btn option">${element}</a>`);
      });
      $('#start').hide();
      // console.log(data.results[counter].question);
      $('.option').on('click', function() {
        // si la respuesta es correcta
        if ($(this) === data.results[counter].correct_answer) {
        // se muestra pantalla correcta y sumar una buena
          $('#start').text('Next');
          $('#start').show();
          $('.container').html('');
        } else {
          // se muestra pantalla incorrecta
          $('#start').text('Next');
          $('#start').show();
          $('.container').html('');
        }
      });
      counter++;
    });
    // evento sobre el boton de las respuestas
    // if (count > 15) {
    // se pasa a la pantalla del final
    // contiene respuestas correctas
    // contiene tu puntaje
    // }
  })
  .catch(function(error) {
  });
