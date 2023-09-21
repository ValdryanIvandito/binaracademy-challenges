const value = ["scissors", "paper", "rock"];
let valueOne, valueCom;
let scores = 0;

function rockP1() {
    valueOne = "rock";
    const result = gameStart(valueOne);
    return result;
}

function paperP1() {
    valueOne = "paper";
    const result = gameStart(valueOne);
    return result;
}

function scissorsP1() {
    valueOne = "scissors";
    const result = gameStart(valueOne);
    return result;
}

function gameStart(valueOne) {
    valueCom = Math.trunc(Math.random() * 3);
    valueCom = value[valueCom];

    //playerOne Win Scenario
    if(valueOne === 'scissors' && valueCom === 'paper') {
        const result = "PLAYER1 WIN!";
        scores = 1;
        return { valueOne, valueCom, result, scores };
    }

    else if(valueOne === "paper" && valueCom === "rock") {
        const result = "PLAYER1 WIN!";
        scores = 1;
        return { valueOne, valueCom, result, scores };
    }

    else if(valueOne === 'rock' && valueCom === "scissors") {
        const result = "PLAYER1 WIN!";
        scores = 1;
        return { valueOne, valueCom, result, scores };
    }

    //playerCom Win Scenario
    else if(valueCom === 'scissors' && valueOne === "paper") {
        const result = "COM WIN!";
        scores = 0;
        return { valueOne, valueCom, result, scores };
    }

    else if(valueCom === "paper" && valueOne === "rock") {
        const result = "COM WIN!";
        scores = 0;
        return { valueOne, valueCom, result, scores };
    }

    else if(valueCom === 'rock' && valueOne === "scissors") {
        const result = "COM WIN!";
        scores = 0;
        return { valueOne, valueCom, result, scores };
    }

    //Draw Scenario
    else if(valueCom === 'rock' && valueOne === 'rock') {
        const result = "DRAW!";
        scores = 0;
        return { valueOne, valueCom, result, scores };
    }

    else if(valueCom === 'paper' && valueOne === 'paper') {
        const result = "DRAW!";
        scores = 0;
        return { valueOne, valueCom, result, scores };
    }

    else {
        const result = "DRAW!";
        scores = 0;
        return { valueOne, valueCom, result, scores };
    }
}

module.exports = { rockP1, paperP1, scissorsP1 };