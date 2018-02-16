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
    // contador de respuestas correctas
    let countCorrect = 0;
    // arreglo con todas las respuestas correctas para mostrar en la última pantalla
    let correctAnswer = [];
    $('#start').on('click', function() {
      $('.container').html('');
      // poner las alternativas en un arreglo
      var alternatives = [];
      alternatives.push(data.results[counter].incorrect_answers[0]);
      alternatives.push(data.results[counter].incorrect_answers[1]);
      alternatives.push(data.results[counter].incorrect_answers[2]);
      alternatives.push(data.results[counter].correct_answer);
      correctAnswer.push(data.results[counter].correct_answer);
      // console.log(correctAnswer);
      // ordenarlas para que la respuesta correcta no esté siempre en la misma posición
      alternatives.sort();
      // crear elementos
      let question = $('<h2 class="question">').text(`${data.results[counter].question}`);
      let category = $('<p class="category">').text('Category: ' + `${data.results[counter].category}`);
      let difficulty = $('<p class="difficulty">').text('Difficulty: ' + `${data.results[counter].difficulty}`);
      $('.container').append(category, difficulty, question);
      let alternativesDisplay = alternatives.forEach(function(element) {
        $('.container').append(`<a class="btn option">${element}</a>`);
      });
      $('#start').hide();
      $('.title').hide();
      // console.log(data.results[counter].question);
      $('.option').on('click', function() {
        // si la respuesta es correcta
        if ($(this).text() === data.results[counter].correct_answer && counter !== 15) {
        // se muestra pantalla correcta y sumar una buena
          $('#start').text('Next');
          $('#start').show();
          $('.container').html('');
          $('.title').text('Correct!');
          $('.title').show();
          countCorrect++;
          // console.log(countCorrect);
        } if ($(this).text() !== data.results[counter].correct_answer && counter !== 15) {
          // se muestra pantalla incorrecta
          $('#start').text('Next');
          $('#start').show();
          $('.container').html('');
          $('.title').text('Awwww wrong answer!');
          $('.title').show();
          let answer = $('<p class="answer">').text('Correct answer is "' + `${data.results[counter].correct_answer}` + '"');
          $('.container').append(answer);
        }
        counter++;
        console.log(counter);
        if (counter === 15) {
          $('.container').html('');
          $('.title').text('Your results');
          $('.title').show();
          $('#start').hide();
          let answersDisplay = correctAnswer.forEach(function(element) {
            $('.container').append('Correct answer: ' + `<p class="answers">${element}</p>` + 'Your answer: ');
          });
        }
      });
    });
  })
  .catch(function(error) {
  });
