let something = 0;

// MUNT 1 (+1 punt)
document.getElementById("coin1").onclick = function () {
  something += 1;
  document.getElementById("score").textContent = something;

};

// MUNT 2 (+10 punten)
document.getElementById("coin2").onclick = function () {
  something += 10;
  document.getElementById("score").textContent = something;

};

// MUNT 3 (+100 punten)
document.getElementById("coin3").onclick = function () {
  something += 100;
  document.getElementById("score").textContent = something;

};
