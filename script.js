const enemies = document.querySelectorAll(".enemy");
const startBtn=document.getElementById("startBtn");
const restartBtn=document.getElementById("restartBtn");
const resetBtn=document.getElementById("resetBtn");
const musicBtn=document.getElementById("musicBtn");


const target=document.getElementById("target");



const scoreText=document.getElementById("score");
const levelText=document.getElementById("level");
const timerText=document.getElementById("timer");
const highscoreText=document.getElementById("highscore");


const resultText=document.getElementById("result");
const instruction=document.getElementById("instruction");



let score=0;

let level=1;

let time=60;

let totalTime=60;

newRecord = false;

let timer;


let highscore=
localStorage.getItem("highscore") || 0;


highscoreText.textContent=highscore;



// MUZIEK SYSTEEM

let musicOn=true;

let audio;

let musicInterval;



function startMusic(){


if(!musicOn)return;



audio=new AudioContext();


let notes=[261,329,392,523];


let i=0;



musicInterval=setInterval(()=>{


let osc=audio.createOscillator();


let gain=audio.createGain();



osc.frequency.value=
notes[i];


osc.type="sine";


gain.gain.value=0.05;



osc.connect(gain);

gain.connect(audio.destination);



osc.start();



osc.stop(
audio.currentTime+1
);



i++;


if(i>=notes.length){

i=0;

}


},900);


}





musicBtn.onclick=function(){


musicOn=!musicOn;


if(musicOn){

musicBtn.innerHTML="🔊 Muziek Aan";

startMusic();


}else{


musicBtn.innerHTML="🔇 Muziek Uit";


clearInterval(musicInterval);


}


};






startBtn.onclick=startGame;

restartBtn.onclick=startGame;




function startGame(){

  
newRecord = false;

score=0;
level=1;
time=60;


scoreText.textContent=0;

levelText.textContent=1;

timerText.textContent=60;


document.getElementById("game").style.display="block";


target.style.display="block";


startBtn.style.display="none";

restartBtn.style.display="none";





resultText.innerHTML = `

${recordText}

<h2>⏰ Game Over</h2>

Score: ${score}

<br>

Level: ${level}

<br>

Highscore: ${highscore}

`;
moveTarget();

moveEnemies();


startMusic();



clearInterval(timer);



timer=setInterval(()=>{


time--;


timerText.textContent=time;



if(time<=0){


level++;


levelText.textContent=level;



time=60;


timerText.textContent=time;



changeBackground();



}



},1000);




target.onclick=hit;

target.ontouchstart=hit;




function hit(){


score++;





scoreText.textContent=score;

levelText.textContent=level;



changeBackground();



if(score > highscore){


highscore = score;


highscoreText.textContent = highscore;


localStorage.setItem(
"highscore",
highscore
);


newRecord = true;


}


}



if(level>=100){


finish();


return;


}



moveTarget();


}






function moveTarget(){



let size=Math.max(
25,
70-level/2
);



target.style.width=size+"px";

target.style.height=size+"px";



target.style.left=
Math.random()*
(window.innerWidth-size)
+"px";



target.style.top=
Math.random()*
(window.innerHeight-size)
+"px";



}





function moveEnemies() {

enemies.forEach(enemy => {

setInterval(() => {

enemy.style.left = Math.random() * (window.innerWidth - 50) + "px";
enemy.style.top = Math.random() * (window.innerHeight - 50) + "px";

}, 1200);

enemy.onclick = die;

});

}



function die() {

clearInterval(timer);

target.style.display = "none";

instruction.style.display = "none";

resultText.innerHTML = `
<h2>💀 Je bent geraakt!</h2>
Score: ${score}
<br>
Level: ${level}
<br>
Highscore: ${highscore}
`;

restartBtn.style.display = "block";

}





function changeBackground(){


let h=level*3;



document.body.style.background=
`linear-gradient(
hsl(${h},70%,20%),
hsl(${h},70%,50%)
)`;


}






function endGame(){

clearInterval(timer);


target.style.display="none";


// witte uitleg weg
instruction.style.display="none";


// game scherm weg
document.getElementById("game").style.display="none";


// alleen uitslag laten zien
let recordText = "";

if(newRecord){

recordText = `

<h2>🎉 Gefeliciteerd!</h2>

<p>📣 Nieuw Highscore!</p>

`;

playPartySound();

}



resultText.innerHTML = `

${recordText}

<h2>⏰ Game Over</h2>

Score: ${score}

<br>

Level: ${level}

<br>

Highscore: ${highscore}

`;



restartBtn.style.display="block";


}







function finish(){


localStorage.setItem(
"highscore",
0
);



location.reload();


}






resetBtn.onclick=function(){


localStorage.setItem(
"highscore",
0
);


highscore=0;


score=0;


level=1;


time=60;



highscoreText.textContent=0;

scoreText.textContent=0;

levelText.textContent=1;

timerText.textContent=60;



resultText.innerHTML="";


};





// sneeuw

setInterval(()=>{


let snow=document.createElement("div");


snow.innerHTML="❄";


snow.style.position="fixed";

snow.style.top="-20px";


snow.style.left=
Math.random()*innerWidth+"px";


snow.style.color="white";


document.body.appendChild(snow);



let y=-20;



let fall=setInterval(()=>{


y+=2;


snow.style.top=y+"px";



if(y>innerHeight){


snow.remove();

clearInterval(fall);


}


},20);



},200);
function playPartySound(){


let audio = new AudioContext();


let osc = audio.createOscillator();


let gain = audio.createGain();



osc.type="sawtooth";


osc.frequency.setValueAtTime(
400,
audio.currentTime
);


osc.frequency.linearRampToValueAtTime(
900,
audio.currentTime + 0.4
);



gain.gain.value=0.15;



osc.connect(gain);

gain.connect(audio.destination);



osc.start();


osc.stop(
audio.currentTime + 0.5
);



}
