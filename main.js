window.addEventListener("load", init);

// Globals

// Available Levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 2,
};

var currentLevel = levels.medium;
let time = currentLevel;
let score = 0;
let isPlaying;
let starttime;
let flag = 0;
var wpm = 0;

// DOM Elements
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");
const highscoreDisplay = document.querySelector("#highscore");
const leveleasy = document.getElementById("rd1");
const levelmedium = document.getElementById("rd2");
const levelhard = document.getElementById("rd3");

//Random paragraph to extract words
const randompara =
  "Hopes and dreams were dashed that day. It should have been expected, but it still came as a shock. The warning signs had been ignored in favor of the possibility, however remote, that it could actually happen. That possibility had grown from hope to an undeniable belief it must be destiny. That was until it wasn't and the hopes and dreams came crashing down. Do you think you're living an ordinary life? You are so mistaken it's difficult to even explain. The mere fact that you exist makes you extraordinary. The odds of you existing are less than winning the lottery, but here you are. Are you going to let this extraordinary opportunity pass? Some random words are hat river lucky statue generate stubborn cocktail runaway joke developer establishment hero javascript nutrition revolver echo siblings investigate horrendous symptom laughter magic master space definition";

let allwords = randompara.split(" ");
//Array to store available words
const words = [];
for (let i = 0; i < allwords.length; i++) {
  let text = allwords[i].trim();
  text = text.replace(".", "");
  text = text.replace(",", "");
  text = text.replace("?", "");
  if (text.indexOf("'") != -1) continue;
  if (text.length >= 4 && text.length <= 15) {
    text = text.toLowerCase();
    words.push(text);
  }
}

//To change levels through radio buttons
leveleasy.onclick = function () {
  currentLevel = 5;
  seconds.innerHTML = currentLevel;
};
levelmedium.onclick = function () {
  currentLevel = 3;
  seconds.innerHTML = currentLevel;
};
levelhard.onclick = function () {
  currentLevel = 2;
  seconds.innerHTML = currentLevel;
};

// Initialize Game
function init() {
  // Show number of seconds in UI
  seconds.innerHTML = currentLevel;

  // Load word from array
  showWord(words);
  // Start matching on word input
  wordInput.addEventListener("input", startMatch);
  // Call countdown every second
  setInterval(countdown, 1000);
  // Check game status
  setInterval(checkStatus, 50);
}

// Start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = "";
    score++;
    if (score == 0) {
      //game just started
      flag = 0;
      //start timer for calculating words per minute
      starttime = new Date();
    }
  }

  // Highscore based on score value for Session Storage
  if (
    typeof sessionStorage["highscore"] === "undefined" ||
    score > sessionStorage["highscore"]
  ) {
    sessionStorage["highscore"] = score;
  } else {
    sessionStorage["highscore"] = sessionStorage["highscore"];
  }

  // Prevent display of High Score: -1
  if (sessionStorage["highscore"] >= 0) {
    highscoreDisplay.innerHTML = sessionStorage["highscore"];
  }

  // If score is -1, display 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = "Correct!!!";
    return true;
  } else {
    message.innerHTML = "";
    return false;
  }
}

// Pick & show random word
function showWord(words) {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // Output random word
  currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown() {
  // Make sure time is not run out
  if (time > 0) {
    // Decrement
    time--;
  } else if (time === 0) {
    // Game is over
    isPlaying = false;
  }
  // Show time
  timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    if (flag == 0) {
      //game just over, calculate words per minute
      flag = 1;
      timetaken = (new Date() - starttime) / 1000;
      wpm = (score / timetaken) * 60;
      wpm = Number(wpm.toPrecision(4));
    }
    message.innerHTML = "Game Over! Words per minute=" + wpm;
    flag = 1;
    score = -1;
  }
}
