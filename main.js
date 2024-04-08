'use strict';

const computerChoice = () => {
    let randomNumber = Math.ceil(Math.random() * 3);
    return randomNumber == 1 ? "rock" : randomNumber == 2 ? "paper" : "scissors";
};

let playerChoice = "";
let isShuffling = false;

let score = JSON.parse(localStorage.getItem('score')) || {
    playerScore: 0,
    computerScore: 0,
    ties: 0
};

const rock = document.querySelector(".rock");
const paper = document.querySelector(".paper");
const scissors = document.querySelector(".scissors");
const reset = document.querySelector(".reset");
const result = document.querySelector(".result");
const playerChoiceImg = document.querySelector(".player-vis > img");
const computerChoiceImg = document.querySelector(".computer-vis > img");

result.innerHTML = `Wins : ${score.playerScore} Loses : ${score.computerScore} Ties : ${score.ties}`;

rock.addEventListener("click", () => {
    if (!isShuffling) {
        playerChoice = "rock";
        compareChoices();
    }
});
paper.addEventListener("click", () => {
    if (!isShuffling) {
        playerChoice = "paper";
        compareChoices();
    }
});
scissors.addEventListener("click", () => {
    if (!isShuffling) {
        playerChoice = "scissors";
        compareChoices();
    }
});
reset.addEventListener("click", () => {
    score = {
        playerScore: 0,
        computerScore: 0,
        ties: 0
    };
    result.innerHTML = `Wins : ${score.playerScore} Loses : ${score.computerScore} Ties : ${score.ties}`;
    playerChoiceImg.src = `blank-circle.svg`;
    computerChoiceImg.src = `blank-circle.svg`;

});

const shuffle = () => {
    const imgComputer = document.querySelector(".computer-vis img");
    const img = ["rock", "scissors", "paper"];
    isShuffling = true;
    const intervalId = setInterval(() => {
        imgComputer.src = `${img[Math.floor(Math.random() * 3)]}.svg`;
    }, 100);


    setTimeout(() => {
        clearInterval(intervalId);
        isShuffling = false;
    }, 1000);
};

function compareChoices() {
    shuffle();
    const computer = computerChoice();
    if ((computer == "rock" && playerChoice == "paper") ||
        (computer == "paper" && playerChoice == "scissors") ||
        (computer == "scissors" && playerChoice == "rock")) {
        score.playerScore += 1;
        result.innerHTML = `You win! <br> Wins : ${score.playerScore}, Loses : ${score.computerScore}, Ties : ${score.ties}`;
    } else if ((computer == "rock" && playerChoice == "scissors") ||
        (computer == "scissors" && playerChoice == "paper") ||
        (computer == "paper" && playerChoice == "rock")) {
        score.computerScore += 1;
        result.innerHTML = `Computer wins! <br> Wins : ${score.playerScore}, Loses : ${score.computerScore}, Ties : ${score.ties}`;
    } else {
        score.ties += 1;
        result.innerHTML = `Tie! <br> Wins : ${score.playerScore}, Loses : ${score.computerScore}, Ties : ${score.ties}`;
    }
    localStorage.setItem('score', JSON.stringify(score));

    playerChoiceImg.src = `${playerChoice}.svg`;
    setTimeout(() => {
        computerChoiceImg.src = `${computer}.svg`;
    }, 1000);
}
