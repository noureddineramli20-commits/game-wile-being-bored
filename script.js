let something = 0;

// MUNT 1 (+1 punt)
document.getElementById("coin1").onclick = function () {
  something += 1;
  document.getElementById("score").textContent = something;

  // Bericht berekenen en updaten
if (something < 999)  {
     document.getElementById("concrats").textContent ="";
  
 else if (something >= 100000) {
    document.getElementById("concrats").textContent =
      "concrats you got the finel point 100.000 point thank you for playing";
  } else {
    let got = Math.floor(something / 1000) * 1000;
    let need = 100000 - got;
    document.getElementById("concrats").textContent = 
      `concrats you have got your ${got.toLocaleString('de-DE')} points need ${need.toLocaleString('de-DE')} more points!`;
  }
};

// MUNT 2 (+10 punten)
document.getElementById("coin2").onclick = function () {
  something += 10;
  document.getElementById("score").textContent = something;

  // Bericht berekenen en updaten
  if (something >= 100000) {
    document.getElementById("concrats").textContent =
      "concrats you got the finel point 100.000 point thank you for playing";
  } else {
    let got = Math.floor(something / 1000) * 1000;
    let need = 100000 - got;
    document.getElementById("concrats").textContent = 
      `concrats you have got your ${got.toLocaleString('de-DE')} points need ${need.toLocaleString('de-DE')} more points!`;
  }
};

// MUNT 3 (+100 punten)
document.getElementById("coin3").onclick = function () {
  something += 100;
  document.getElementById("score").textContent = something;

  // Bericht berekenen en updaten
  if (something >= 100000) {
    document.getElementById("concrats").textContent =
      "concrats you got the finel point 100.000 point thank you for playing";
  } else {
    let got = Math.floor(something / 1000) * 1000;
    let need = 100000 - got;
    document.getElementById("concrats").textContent = 
      `concrats you have got your ${got.toLocaleString('de-DE')} points need ${need.toLocaleString('de-DE')} more points!`;
  }
};
