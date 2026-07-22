const something = 0;

document.getElementById("score").textContent = something;

document.getElementById("coin1").onclick = function () {
  something += 1;
  document.getElementById("score").textContent = something;
};

document.getElementById("coin2").onclick = function () {
  something += 10;
  document.getElementById("score").textContent = something;
};

document.getElementById("coin3").onclick = function () {
  something += 100;
  document.getElementById("score").textContent = something;
};

document.getElementById("reset").onclick = function () {
  document.getElementById("score").textContent = something -= something;
};
console.log("something");
