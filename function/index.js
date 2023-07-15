let playerLives = 3;
const bossLife = 5;
const weapons = ["rock", "paper", "scissors"];
let isFinalBoss = false;
let playerWins = 0;
let gameInProgress = false;

const getBossChoice = () => {
  if (isFinalBoss) {
    const finalBossWeapons = ["rock", "paper", "scissors"];
    return finalBossWeapons[Math.floor(Math.random() * finalBossWeapons.length)];
  } else {
    const botWeapon = weapons[Math.floor(Math.random() * weapons.length)];
    return botWeapon;
  }
};

const getPlayerChoice = () => {
  const buttons = document.querySelectorAll(".choice-button");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      if (gameInProgress) {
        const playerChoice = button.id;
        const bossChoice = getBossChoice();
        playRound(playerChoice, bossChoice);
      }
    });
  });
};

const playRound = (playerChoice, bossChoice) => {
  const success = `Impressive! You won! You used ${playerChoice} and your opponent used ${bossChoice}`;
  const failed = `You lost! You used ${playerChoice} and your opponent used ${bossChoice}`;
  const draw = `Draw! You both used ${playerChoice}`;

  switch (true) {
    case playerChoice === bossChoice:
      document.querySelector('.result').innerHTML = draw;
      break;
    case playerChoice === "scissors" && bossChoice === "paper":
    case playerChoice === "rock" && bossChoice === "scissors":
    case playerChoice === "paper" && bossChoice === "rock":
      increaseWins();
      document.querySelector('.result').innerHTML = success;
      break;
    default:
      decreaseLives();
      document.querySelector('.result').innerHTML = failed;
      break;
  }
};

const playGame = () => {
  const weaponArea = document.querySelector(".weapon-area");
  const play = document.querySelector("#play");

  if (playerLives > 0) {
    weaponArea.style.display = "block";
    play.style.display = "none";
    gameInProgress = true;
  } else {
    document.querySelector('.result').innerHTML = "Game Over!";
    hideButtons();
    play.style.display = "block";
    gameInProgress = false;
  }

  getPlayerChoice();
};

const decreaseLives = () => {
  playerLives--;
  console.log(`Player lives: ${playerLives}`);
  if (playerLives === 0) {
    console.log("Game over! You have no more lives.");
    showPlayAgainPrompt();
  }
};

const increaseWins = () => {
  playerWins++;
  console.log(`Player wins: ${playerWins}`);
  if (playerWins === 5 && isFinalBoss) {
    console.log("Congratulations! You defeated the final boss!");
    showPlayAgainPrompt();
  } else if (playerWins === 4) {
    console.log("You defeated the regular bosses! Get ready for the final boss!");
    isFinalBoss = true;
  }
};

const hideButtons = () => {
  const weaponArea = document.querySelector(".weapon-area");
  weaponArea.style.display = "none";
};

const showButtons = () => {
  const weaponArea = document.querySelector(".weapon-area");
  weaponArea.style.display = "block";
};

const showPlayAgainPrompt = () => {
  const playAgain = confirm("Do you want to play again?");
  if (playAgain) {
    resetGame();
    location.reload();
  } else {
    console.log("Thanks for playing!");
    hideButtons();
    location.reload();
  }
};

const resetGame = () => {
  playerLives = 3;
  playerWins = 0;
  isFinalBoss = false;
  console.log("Game reset. Starting a new game.");
  playGame();
};

