var waitingKeydown = true; //true if the game must (re)start
var level = 0; //game level
var debug = false; //used to visualize more info

//arrays of strings
var colorSequence = [];
var currentColorSequence = [];

if(debug){
  $(".debug").show();
}
else {
  $(".debug").hide();
}

//return: string
function nextColor(){
  var colors = ["green", "red", "blue", "yellow"];
  var index = Math.floor(Math.random() * 4);
  return colors[index];
}

//need to mantain color class in second position in html
//button: Element
function playSound(button){
  var color = button.classList[1];
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

//button: Element
function playAnimation(button){
  playSound(button);
  $(button).fadeOut(150).fadeIn(150);
}

function gameOver(){
  //set status to starting value
  colorSequence = [];
  currentColorSequence = [];
  if(debug) $("#sequence").text(currentColorSequence);
  level = 0;
  waitingKeydown = true;


  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 100);
  $("#level-title").text("Game Over, Press Any Key or Touch Here to Restart");
}

function gameLoop(){
  var color = nextColor();
  colorSequence.push(color);
  currentColorSequence = colorSequence.slice();
  if(debug) $("#sequence").text(currentColorSequence);
  playAnimation($("#" + color).get(0));
}

function showNewLevel(){
  $("#level-title").text("Level " + ++level);
  gameLoop();
}



/*********** The program start with events ***********/

$(".btn").click(function(){
  var button = $(this); //setTimeout has different this

  //check if this button is the correct one
  if(this.classList[1] != currentColorSequence.shift()) {
    gameOver();
  }

  if(debug) $("#sequence").text(currentColorSequence);
  $(this).addClass("pressed");
  playSound(this);
  setTimeout(function() {
    button.removeClass("pressed");
  }, 100);

  //waitingKeydown is true if game is stopped
  if(!waitingKeydown && currentColorSequence.length == 0){
    setTimeout(function() {
      showNewLevel();
    }, 700);
  }
})

$(document).on("keydown", function(){
  if(waitingKeydown) {
    waitingKeydown = false;
    showNewLevel();
  }
});

//for mobile visitors
$("#level-title").click(function(){
  if(waitingKeydown) {
    waitingKeydown = false;
    showNewLevel();
  }
})


//attendi un tasto per partire
  //funzione gameLoop
    //eseguo netxcolor
    //individuo il bottone col colore
    //aggiungo alla sequence di colori già uscita
    //faccio l'animazione
    //attendo che l'utente interagisca
  //se interagisce bene
    //incremento il livello e ripeto il gameLoop
  //altrimenti
    //faccio il suono brutto, dico che c'è stato errore e cancello tutto
    //torno all'inizio in cui bisogna premere un tasto per partire
