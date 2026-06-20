const startBtn=document.getElementById("startBtn");
const restartBtn=document.getElementById("restartBtn");
const resetBtn=document.getElementById("resetBtn");
const musicBtn=document.getElementById("musicBtn");


const target=document.getElementById("target");

const enemies=document.querySelectorAll(".enemy");


const scoreText=document.getElementById("score");
const levelText=document.getElementById("level");
const timerText=document.getElementById("timer");
const highscoreText=document.getElementById("highscore");


const result=document.getElementById("result");
const instruction=document.getElementById("instruction");


let score=0;

let level=1;

let time=60;

let timer;


let highscore=
Number(localStorage.getItem("highscore")) || 0;


let newRecord=false;



let musicOn=true;

let audio;

let musicLoop;



highscoreText.textContent=highscore;



startBtn.onclick=startGame;

restartBtn.onclick=startGame;




function startGame(){


score=0;

level=1;

time=60;

newRecord=false;


scoreText.textContent=0;

levelText.textContent=1;

timerText.textContent=60;



result.innerHTML="";

instruction.style.display="block";


document.getElementById("game").style.display="block";


target.style.display="block";


startBtn.style.display="none";

restartBtn.style.display="none";



moveTarget();

moveEnemies();



startMusic();



timer=setInterval(()=>{


time--;


timerText.textContent=time;



if(time<=0){


level++;


time=60;


levelText.textContent=level;


changeBackground();



}



if(level>=100){


level=1;

score=0;

highscore=0;


localStorage.clear();


}


},1000);



}







target.onclick=hit;

target.ontouchstart=hit;



function hit(){


score++;


scoreText.textContent=score;



if(score>highscore){


highscore=score;


newRecord=true;


highscoreText.textContent=highscore;


localStorage.setItem(
"highscore",
highscore
);


}



moveTarget();



}







function moveTarget(){


let size=Math.max(
30,
70-level
);


target.style.width=size+"px";

target.style.height=size+"px";


target.style.left=
Math.random()*(innerWidth-size)+"px";


target.style.top=
Math.random()*(innerHeight-size)+"px";


}






function moveEnemies(){


enemies.forEach(enemy=>{


setInterval(()=>{


enemy.style.left=
Math.random()*(innerWidth-50)+"px";


enemy.style.top=
Math.random()*(innerHeight-50)+"px";


},1000);



enemy.onclick=dead;


enemy.ontouchstart=dead;



});


}







function dead(){


endScreen("💀 Je bent geraakt!");

}






function endScreen(title){



clearInterval(timer);


target.style.display="none";

instruction.style.display="none";


let text="";


if(newRecord){


text=`

<h2>🎉 Gefeliciteerd!</h2>

<p>📣 Nieuw Highscore!</p>

`;

partySound();

}



result.innerHTML=`

${text}

<h2>${title}</h2>

Score: ${score}

<br>

Level: ${level}

<br>

Highscore: ${highscore}


`;



restartBtn.style.display="block";


}







function changeBackground(){


let kleur=level*4;


document.body.style.background=

`linear-gradient(
hsl(${kleur},70%,20%),
hsl(${kleur},70%,50%)
)`;



}






// muziek

function startMusic(){


if(!musicOn)return;


audio=new AudioContext();


let notes=[261,329,392,523];


let i=0;


musicLoop=setInterval(()=>{


let osc=audio.createOscillator();


let gain=audio.createGain();



osc.frequency.value=notes[i];


gain.gain.value=0.04;


osc.connect(gain);

gain.connect(audio.destination);


osc.start();

osc.stop(audio.currentTime+1);



i++;


if(i>=notes.length)i=0;


},900);


}



musicBtn.onclick=function(){


musicOn=!musicOn;


if(musicOn){

musicBtn.innerHTML="🔊 Muziek Aan";

startMusic();

}else{

musicBtn.innerHTML="🔇 Muziek Uit";

clearInterval(musicLoop);

}


}






function partySound(){


let ctx=new AudioContext();


let osc=ctx.createOscillator();


let gain=ctx.createGain();



osc.frequency.value=700;

gain.gain.value=.2;


osc.connect(gain);

gain.connect(ctx.destination);


osc.start();


osc.stop(
ctx.currentTime+0.5
);


}






resetBtn.onclick=function(){


localStorage.clear();


location.reload();


}






// sneeuw

setInterval(()=>{


let s=document.createElement("div");


s.innerHTML="❄";

s.style.position="fixed";

s.style.color="white";

s.style.left=Math.random()*innerWidth+"px";

s.style.top="-20px";


document.body.appendChild(s);



let y=-20;


let fall=setInterval(()=>{


y+=2;


s.style.top=y+"px";


if(y>innerHeight){

clearInterval(fall);

s.remove();

}


},20);



},200);
