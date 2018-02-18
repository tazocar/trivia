/* console.log(data.results[0].question);
console.log(data.results[0].incorrect_answers[0]);
console.log(data.results[0].incorrect_answers[1]);
console.log(data.results[0].incorrect_answers[2]);
console.log(data.results[0].correct_answer);
console.log(data.results[0].difficulty);
console.log(data.results[0].category);*/

let anime = 'https://opentdb.com/api.php?amount=15&category=31&type=multiple';
let cience = 'https://opentdb.com/api.php?amount=15&category=20&type=multiple';
let animals = 'https://opentdb.com/api.php?amount=10&encode=base64';
$('.trueFalse').hide();
$('.multiple').hide();
$('#start').hide(); 

$('.choices').on('click', function() {
  $('.choices').hide();
  $('.trueFalse').show();
  $('.multiple').show(); 
  optionsToPlay($(this).attr('data-api'));
});

function optionsToPlay(result) {
  $('.trueFalse').on('click', function() {
    displayQuestions(result + '&type=boolean');
    $('#start').show(); 
  });
  $('.multiple').on('click', function() {
    displayQuestions(result + '&type=multiple');
    $('#start').show(); 
  });
}
function displayQuestions(typeChoice) {
  $('.trueFalse').hide();
  $('.multiple').hide();
  fetch(typeChoice)
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
        $('.result').html('');
        // poner las alternativas en un arreglo
        var alternatives = [];
        data.results[counter].incorrect_answers.forEach(function(element){
          alternatives.push(element);
        })
        // alternatives.push(data.results[counter].incorrect_answers[0]);
        // alternatives.push(data.results[counter].incorrect_answers[1]);
        // alternatives.push(data.results[counter].incorrect_answers[2]);
        alternatives.push(data.results[counter].correct_answer);
        correctAnswer.push(data.results[counter].correct_answer);
        // console.log(correctAnswer);
        // ordenarlas para que la respuesta correcta no esté siempre en la misma posición
        alternatives.sort();
        // crear elementos
        let question = $('<h2 class="question">').text(`${data.results[counter].question}`);
        let category = $('<p class="categoryDifficulty">').html(`Category: <span class="displayInfo"> ${data.results[counter].category}</span>`);
        let difficulty = $('<p class="categoryDifficulty">').html(`Difficulty: <span class="displayInfo">${data.results[counter].difficulty}</span>`);
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
            $('.result').html('<img src="src/images/check.png" alt="" class="answer">');
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
            $('.result').html('<img src="src/images/close.png" alt="" class="answer">');
            let answer = $('<p class="correctAnswer">').text(`Correct answer is " ${data.results[counter].correct_answer}`);
            $('.container').append(answer);
          }
          counter++;
          console.log(counter);
          if (counter === 15) {
            $('.container').html('');
            $('.title').text('Your results');
            $('.title').show();
            $('#start').hide();
            $('.result').html(`You got ${countCorrect} out of ${counter}`);
            let answersDisplay = data.results.forEach(function(element) {
              $('.container').append(`<p class="questionResults questionResultsQuestion">Question:</p> <p class="displayQuestionResult">${element.question}</p> <p class="questionResults">Correct answer:</p> <p class="correctAnswer">${element.correct_answer}</p>`);
            });
          }
        });
      });
    })
    .catch(function(error) {
    });
}