/* Value Definition:
0 = "scissors"
1 = "paper"
2 = "rock"
*/
const value = ["scissors", "paper", "rock"];

let count = 3;
let state = true;
let statebgm = true;
let valueOne, valueCom;

let interval = 1000;
let delay = 3250;

let imageScissorsOne = document.querySelector('.bP1Scissors');
let imagePaperOne = document.querySelector('.bP1Paper');
let imageRockOne = document.querySelector('.bP1Rock');
let imageScissorsCom = document.querySelector('.iPCScissors');
let imagePaperCom = document.querySelector('.iPCPaper');
let imageRockCom = document.querySelector('.iPCRock');
let signs = document.querySelector('.tSigns');
let audioContainer = document.querySelector('.audioContainer');
let bgm = document.querySelector('.bgm');
bgm.src = 'bgm/FF7Chocobo.mp3';

function rockP1() {
    valueOne = "rock";
    gameStart(valueOne);
}

function paperP1() {
    valueOne = "paper";
    gameStart(valueOne);
}

function scissorsP1() {
    valueOne = "scissors";
    gameStart(valueOne);
}

// function countDown() {
//     if(state === true) {
//         signs.textContent = String(count);

//         let countInterval = setInterval(function() {
//             count--;

//             if(count === 1) {
//                 clearInterval(countInterval);
//             }

//             signs.textContent = String(count);
//         }, interval);

//         setTimeout(function() {
//             gameStart(valueOne);
//         }, delay);
//     } 

//     else {
//         return;
//     }
// }

function winResultP1() {
    console.log(`PLAYER1: ${valueOne} VS COM: ${valueCom}`);
    console.log("PLAYER1 WIN!");
    state = false;
    statebgm = false;
    signs.classList.add('tSignsWin');
    signs.textContent = "PLAYER1 WIN";
    bgm.src = 'bgm/FF7Victory.mp3';
}

function winResultPC() {
    console.log(`PLAYER1: ${valueOne} VS COM: ${valueCom}`);
    console.log("COM WIN!");
    state = false;
    signs.classList.add('tSignsWin');
    signs.textContent = "COM WIN";
}

function drawResult() {
    console.log(`PLAYER1: ${valueOne} VS COM: ${valueCom}`);
    console.log("DRAW!");
    state = false;
    signs.classList.add('tSignsDraw');
    signs.textContent = "DRAW";
}

function gameStart(valueOne) {
    valueCom = Math.trunc(Math.random() * 3);
    valueCom = value[valueCom];
        
    //playerOne Win Scenario
    if(valueOne === 'scissors' && valueCom === "paper") {
        winResultP1();
        imageScissorsOne.classList.add('hidden');
        imagePaperCom.classList.add('hidden');
    }

    else if(valueOne === "paper" && valueCom === "rock") {
        winResultP1();
        imagePaperOne.classList.add('hidden');
        imageRockCom.classList.add('hidden');
    }

    else if(valueOne === 'rock' && valueCom === "scissors") {
        winResultP1();
        imageRockOne.classList.add('hidden');
        imageScissorsCom.classList.add('hidden');
    }

    //playerCom Win Scenario
    else if(valueCom === 'scissors' && valueOne === "paper") {
        winResultPC();
        imagePaperOne.classList.add('hidden');
        imageScissorsCom.classList.add('hidden');
    }

    else if(valueCom === "paper" && valueOne === "rock") {
        winResultPC();
        imageRockOne.classList.add('hidden');
        imagePaperCom.classList.add('hidden');
    }

    else if(valueCom === 'rock' && valueOne === "scissors") {
        winResultPC();
        imageScissorsOne.classList.add('hidden');
        imageRockCom.classList.add('hidden');
    }

    //Draw Scenario
    else if(valueCom === 'rock' && valueOne === 'rock') {
        drawResult()
        imageRockOne.classList.add('hidden');
        imageRockCom.classList.add('hidden');
    }

    else if(valueCom === 'paper' && valueOne === 'paper') {
        drawResult();
        imagePaperOne.classList.add('hidden');
        imagePaperCom.classList.add('hidden');
    }

    else {
        drawResult();
        imageScissorsOne.classList.add('hidden');
        imageScissorsCom.classList.add('hidden');
    }
}

function gameRestart() {
    count = 3;
    state = true;
    signs.textContent = "VS";
    imageRockOne.classList.remove('hidden');
    imagePaperOne.classList.remove('hidden');
    imageScissorsOne.classList.remove('hidden');
    imageRockCom.classList.remove('hidden');
    imagePaperCom.classList.remove('hidden');
    imageScissorsCom.classList.remove('hidden');
    signs.classList.remove('tSignsWin');
    signs.classList.remove('tSignsDraw');

    if(statebgm === false) {
        statebgm = true
        bgm.src = 'bgm/FF7Chocobo.mp3';
    } 
}