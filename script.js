const startBtn = document.getElementById("startBtn");
const game = document.getElementById("game");
const target = document.getElementById("target");
const scoreText = document.getElementById("score");
const timerText = document.getElementById("timer");
const resultText = document.getElementById("result");

let score = 0;
let timeLeft = 60;
let gameRunning = false;
let timerInterval = null;

startBtn.addEventListener("click", startGame);

function startGame() {
  score = 0;
  timeLeft = 60;

  scoreText.textContent = score;
  timerText.textContent = timeLeft;
  resultText.textContent = "";

  game.style.display = "block";
  target.style.display = "block";
  startBtn.style.display = "none";

  gameRunning = true;

  moveTarget();

  timerInterval = setInterval(() => {
    timeLeft--;
    timerText.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

target.addEventListener("click", () => {
  if (!gameRunning) return;

  score++;
  scoreText.textContent = score;

  moveTarget();
});

function moveTarget() {
  const maxX = window.innerWidth - 100;
  const maxY = window.innerHeight - 100;

  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);

  target.style.left = `${x}px`;
  target.style.top = `${y}px`;
}

function endGame() {
  gameRunning = false;

  clearInterval(timerInterval);

  target.style.display = "none";

  resultText.innerHTML = `
    <h2>⏰ Tijd voorbij!</h2>
    <p>Jouw score: <strong>${score}</strong></p>

  `;
}
restartBtn.style.display = "none";
function endGame() {
  gameRunning = false;

  clearInterval(timerInterval);

  target.style.display = "none";

  resultText.innerHTML = `
      <h2>⏰ Tijd voorbij!</h2>
      <p>Jouw score: <strong>${score}</strong></p>
    `;

  restartBtn.style.display = "block";
}
