/* console.log(data.results[0].question);
console.log(data.results[0].incorrect_answers[0]);
console.log(data.results[0].incorrect_answers[1]);
console.log(data.results[0].incorrect_answers[2]);
console.log(data.results[0].correct_answer);
console.log(data.results[0].difficulty);
console.log(data.results[0].category);*/
// inicio sesión con firebase
$(document).ready(function() {
  // para que siempre esté deslogeado
  firebase.auth().signOut();
  $('#start').hide();
  $('button').hide();
});
// Al hacer click en el boton de registro con google:
document.getElementById('btnsignUp').addEventListener('click', GoogleSignUp, false);
// Initialize Firebase
var config = {
  apiKey: 'AIzaSyCoCBlZhycLbNacfdCEbzWcHcIOUT05cBw',
  authDomain: 'trivia-54132.firebaseapp.com',
  databaseURL: 'https://trivia-54132.firebaseio.com',
  projectId: 'trivia-54132',
  storageBucket: '',
  messagingSenderId: '920398654997'
};
firebase.initializeApp(config);
// función de ingreso con google
var token = 'none';
var user = 'none';
var email = 'none';
// guardar los usuarios que se registren
var userData = firebase.database().ref('users');
function GoogleSignUp() {
  if (!firebase.auth().currentUser) {
    // para saber si el usuario se ha conectado
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      token = result.credential.accessToken;
      user = result.user;
		  email = user.email;
      $('#btnsignUp').hide() && $('.choices').show();
      // guardar el nombre de usuario en firebase
      userData.orderByChild('email').equalTo(user.email).on('value', function(snapshot) {
        // console.log(snapshot.val());
        if (snapshot.val() === null) {
          // console.log('Nuevo Usuario');
          userData.push({
            photo: user.photoURL,
            name: user.displayName,
            email: user.email
          });
        } else {
          // console.log('Usuario Existente');
        }
      });
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var errorEmail = error.email;
      var credencial = error.credencial;
      // console.log(errorCode);
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('Es el mismo usuario');
      }
    });
  } else {
    firebase.auth().signOut();
  }
}

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
        data.results[counter].incorrect_answers.forEach(function(element) {
          alternatives.push(element);
        });
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
