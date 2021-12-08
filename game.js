const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [],
  userClickedPattern = [];
let keyHandler = false;
let level = 0;

function playAudio(sound) {
  let audio = new Audio("./sounds/" + sound + ".mp3");
  return audio.play();
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    startOver();
  }
}

function nextSequence() {
  keyHandler = true;
  userClickedPattern = [];
  let randomNumber = Math.round(Math.random() * 3);
  let randomChosenColor = buttonColors[randomNumber];

  level++;
  $("#level-title").text("Level " + level);

  gamePattern.push(randomChosenColor);

  playAudio(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  $("#level-title").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  playAudio("wrong");
  level = 0;
  gamePattern = [];
  keyHandler = false;
}

$(".btn").click(function () {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playAudio(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keydown(function () {
  if (!keyHandler) {
    nextSequence();
  }
});

$("#level-title").click(function () {
  if (!keyHandler) {
    nextSequence();
  }
});
