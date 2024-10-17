let gameSeq=[];
let userSeq=[];

let started = false;
let level = 0;
let highScore = 0;

let h1 = document.querySelector("h1");
let p = document.querySelector("p");

let btns = ["yellow", "red", "green", "blue"];





document.addEventListener("keypress", startGame);

document.addEventListener("mousedown", startGame);

function startGame() {
    
    if(started == false){
        console.log("Game is started...");
        started = true;

        levelUp();
    }
}

function btnFlash(btn, randColor) {
    // Add the appropriate flash class
    if (randColor == "red") {
        btn.classList.add("flash-red");
    } else if (randColor == "yellow") {
        btn.classList.add("flash-yellow");
    } else if (randColor == "green") {
        btn.classList.add("flash-green");
    } else if (randColor == "blue") {
        btn.classList.add("flash-blue");
    }

    

    // Remove the color and fade-out classes after the transition
    setTimeout(function () {
        btn.classList.remove("flash-red", "flash-yellow", "flash-green", "flash-blue", "flash");
    }, 500); // Total duration should match the transition duration
}

function levelUp() {
    userSeq = [];
    level++;
    h1.innerText = ``;
    p.innerText = `Level ${level}`;


    //random btn choose

    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);

    btnFlash(randBtn, randColor);

}
function checkAns(idx) {
    
    
    if (userSeq[idx]===gameSeq[idx]) {
        if(userSeq.length==gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        highScore = Math.max(highScore, level);
        h1.innerText = `Press any key to start`;
        p.innerText = `Game Over \n You Scored: ${level}\n High score: ${highScore}`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "black";

        },150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    let color;
    for (let cls of btn.classList) {
        if (cls === 'red' || cls === 'green' || cls === 'yellow' || cls === 'blue') {
            color = cls; // Assign the color class
            break; // Exit the loop once the color is found
        }
    }
    userSeq.push(color);
    checkAns(userSeq.length-1);
    btnFlash(btn, color);
}

let allBtns = document.querySelectorAll(".btn");

for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}


function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
