const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const target = document.getElementById("target");
const game = document.getElementById("game");
const scoreText = document.getElementById("score");
const timerText = document.getElementById("timer");
const highscoreText = document.getElementById("highscore");
const resultText = document.getElementById("result");
const instruction = document.getElementById("instruction");

let score = 0;
let timeLeft = 60;
let timer;
let highscore = localStorage.getItem("highscore") || 0;

highscoreText.textContent = highscore;

// START
startBtn.onclick = function () {

  clearInterval(timer);

  score = 0;
  timeLeft = 60;

  scoreText.textContent = score;
  timerText.textContent = timeLeft;

  game.style.display = "block";
  target.style.display = "block";

  startBtn.style.display = "none";
  restartBtn.style.display = "none";

  instruction.style.display = "block";
  resultText.innerHTML = "";

  moveTarget();

  timer = setInterval(() => {
    timeLeft--;
    timerText.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
};

// CLICK
target.onclick = function () {

  score++;
  scoreText.textContent = score;

  if (score > highscore) {
    highscore = score;
    highscoreText.textContent = highscore;
    localStorage.setItem("highscore", highscore);
  }

  moveTarget();
};

// END GAME
function endGame() {

  clearInterval(timer);

  target.style.display = "none";
  instruction.style.display = "none";

  let newRecord = "";

  if (score === highscore && score > 0) {
    newRecord = `
      <h2>🎉 Gefeliciteerd!</h2>
      <p>Nieuw record!</p>
    `;
  }

  resultText.innerHTML = `
    ${newRecord}
    <h2>⏰ Tijd voorbij!</h2>
    Score: ${score}
    <br>
    Highscore: ${highscore}
  `;

  restartBtn.style.display = "block";
}

// RESTART
restartBtn.onclick = function () {
  startBtn.style.display = "block";
  restartBtn.style.display = "none";
  resultText.innerHTML = "";
};

// MOVE TARGET
function moveTarget() {
  let x = Math.random() * (window.innerWidth - 100);
  let y = Math.random() * (window.innerHeight - 100);

  target.style.left = x + "px";
  target.style.top = y + "px";
}
