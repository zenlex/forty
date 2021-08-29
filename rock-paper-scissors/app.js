//select elements

const choices = document.querySelectorAll('.choice');
const result = document.querySelector('.result > p');
const userScoreDisp = document.getElementById('user-score');
const compScoreDisp = document.getElementById('comp-score');
const scoreboard = document.querySelector('.scoreboard');

let userScore = 0;
let compScore = 0;
result.textContent = ""

//event listeners - user selection
choices.forEach(function (choice) {
    console.log(`adding listener to ${choice.id}`)
    choice.addEventListener('click', displayWinner);
})

//calculate winner
function displayWinner(e) {
    e.preventDefault();
    calcWinner(e)
    updateScore();
}

function updateScore() {
    userScoreDisp.textContent = userScore;
    compScoreDisp.textContent = compScore;
}

function resetStyles(target, action) {
    const targets = [target, scoreboard]
    targets.forEach((item) => item.classList.add(`${action}`));
    setTimeout(() => targets.forEach((item) => item.classList.remove('lose', 'win', 'tie')), 500);
    setTimeout(() => result.textContent = "", 2000)
}

function compWins(user, comp, target) {
    compScore++;
    result.textContent = `You Lose! ${comp} beats ${user}`
    resetStyles(target, 'lose')
}

function userWins(user, comp, target) {
    userScore++
    result.textContent = `You Win! ${user} beats ${comp}`
    resetStyles(target, 'win');
}

function tie(user, comp, target) {
    result.textContent = `It's a draw ${user} ties ${comp}`
    resetStyles(target, 'tie');
}

function calcWinner(event) {
    console.log('calculating winner')
    const target = event.currentTarget
    const userChoice = target.id;
    const compChoices = ["rock", "paper", "scissors"]
    const compChoice = compChoices[Math.floor(Math.random() * compChoices.length)];

    if (userChoice === compChoice) {
        tie(userChoice, compChoice, target);
    } else if (userChoice === 'rock') {
        if (compChoice === 'paper') {
            compWins(userChoice, compChoice, target);
        } else {
            userWins(userChoice, compChoice, target);
        }
    } else if (userChoice === 'paper') {
        if (compChoice === 'scissors') {
            compWins(userChoice, compChoice, target);
        } else {
            userWins(userChoice, compChoice, target);
        }
    } else if (userChoice === 'scissors') {
        if (compChoice === 'rock') {
            compWins(userChoice, compChoice, target);
        } else {
            userWins(userChoice, compChoice, target);
        }
    }
}
