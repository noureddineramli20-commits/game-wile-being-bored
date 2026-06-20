console.log("JS werkt");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const target = document.getElementById("target");

const scoreText = document.getElementById("score");
const timerText = document.getElementById("timer");

const highscoreText = document.getElementById("highscore");

const resultText = document.getElementById("result");

const instruction = document.getElementById("instruction");


let score = 0;
let timeLeft = 60;

let highscore =
localStorage.getItem("highscore") || 0;

let timerInterval;

let gameRunning = false;



highscoreText.textContent = highscore;



startBtn.addEventListener("click", startGame);

restartBtn.addEventListener("click", startGame);



function startGame(){


clearInterval(timerInterval);


score = 0;

timeLeft = 60;


scoreText.textContent = score;

timerText.textContent = timeLeft;


resultText.innerHTML="";


instruction.style.display="block";


target.style.display="block";


startBtn.style.display="none";

restartBtn.style.display="none";


gameRunning=true;


moveTarget();



timerInterval=setInterval(()=>{


timeLeft--;


timerText.textContent=timeLeft;



if(timeLeft <= 0){

endGame();

}


},1000);



}



target.addEventListener("click",()=>{


if(!gameRunning)return;



score++;


scoreText.textContent=score;



if(score > highscore){


highscore=score;


highscoreText.textContent=highscore;


localStorage.setItem(
"highscore",
highscore
);


}



moveTarget();


});





function endGame(){


gameRunning=false;


clearInterval(timerInterval);



target.style.display="none";


instruction.style.display="none";



resultText.innerHTML=

`
<h2>⏰ Tijd voorbij!</h2>

Score: ${score}

<br>

Highscore: ${highscore}

`;



restartBtn.style.display="block";


}






function moveTarget(){


let x=Math.random()*
(window.innerWidth-100);


let y=Math.random()*
(window.innerHeight-100);



target.style.left=x+"px";

target.style.top=y+"px";


}






function makeSnow(){


let snow=document.createElement("div");


snow.innerHTML="❄";


snow.style.position="fixed";

snow.style.top="-20px";

snow.style.left=
Math.random()*window.innerWidth+"px";


snow.style.color="white";

snow.style.fontSize=
Math.random()*20+10+"px";


document.body.appendChild(snow);



let y=-20;



let fall=setInterval(()=>{


y+=2;


snow.style.top=y+"px";



if(y>window.innerHeight){


clearInterval(fall);

snow.remove();


}


},20);


}



setInterval(makeSnow,200);
}
