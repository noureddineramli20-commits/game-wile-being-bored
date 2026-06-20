const startBtn =
document.getElementById("startBtn");


const restartBtn =
document.getElementById("restartBtn");


const target =
document.getElementById("target");


const game =
document.getElementById("game");


const scoreText =
document.getElementById("score");


const timerText =
document.getElementById("timer");


const highscoreText =
document.getElementById("highscore");


const resultText =
document.getElementById("result");


const instruction =
document.getElementById("instruction");



let score = 0;

let timeLeft = 60;

let timer;


let highscore =
localStorage.getItem("highscore") || 0;



highscoreText.textContent = highscore;





startBtn.onclick = function(){


score = 0;

timeLeft = 60;



scoreText.textContent = score;

timerText.textContent = timeLeft;



game.style.display="block";


target.style.display="block";


resultText.innerHTML="";


instruction.style.display="block";


startBtn.style.display="none";


restartBtn.style.display="none";



moveTarget();




clearInterval(timer);



timer=setInterval(function(){



timeLeft--;


timerText.textContent=timeLeft;




if(timeLeft <= 0){


endGame();


}



},1000);



};






target.onclick=function(){


score++;


scoreText.textContent=score;




if(score > highscore){

localStorage.setItem(
"oldHighscore",
highscore
);


highscore=score;


highscoreText.textContent=highscore;


localStorage.setItem(
"highscore",
highscore
);


}


}




moveTarget();


};






function moveTarget(){



let x =
Math.random() *
(window.innerWidth-100);



let y =
Math.random() *
(window.innerHeight-100);



target.style.left=x+"px";


target.style.top=y+"px";



}





function endGame(){


clearInterval(timer);


target.style.display="none";


instruction.style.display="none";



let newRecord = "";


if(score >= highscore && score > 0){

newRecord = `

<h2>🎉 Gefeliciteerd!</h2>

<p>Je hebt een nieuw record!</p>

`;

}



if(score > highscore){

highscore = score;


highscoreText.textContent = highscore;


localStorage.setItem(
"highscore",
highscore
);

}




resultText.innerHTML =


`

${newRecord}


<h2>⏰ Tijd voorbij!</h2>

Score: ${score}

<br>

Highscore: ${highscore}


`;



restartBtn.style.display="block";


}











restartBtn.onclick=function(){



restartBtn.style.display="none";


startBtn.style.display="block";



};







function snow(){



let flake=document.createElement("div");


flake.innerHTML="❄";


flake.style.position="fixed";

flake.style.top="-20px";


flake.style.left=
Math.random()*window.innerWidth+"px";


flake.style.color="white";


flake.style.fontSize=
Math.random()*20+10+"px";



document.body.appendChild(flake);



let y=-20;



let fall=setInterval(()=>{



y+=2;


flake.style.top=y+"px";



if(y>window.innerHeight){


clearInterval(fall);


flake.remove();


}



},20);



}



setInterval(snow,200);
