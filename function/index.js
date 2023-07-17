let playerLives = 3;
const bossLife = 5;
const weapons = ["rock", "paper", "scissors"];
let isFinalBoss = false;
let playerWins = 0;
let gameInProgress = false;
//loading screen
// window.addEventListener('load', function() {
//   var loadingScreen = document.getElementById('loading-screen');
//   var content = document.getElementById('content');
//   loadingScreen.style.display = 'none';
// });
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
  const choiceWeapons = document.querySelectorAll(".choice-weapon");
  choiceWeapons.forEach(choice => {
    choice.addEventListener("click", () => {
      if (gameInProgress) {
        const playerChoice = choice.getAttribute("data-choice");
        const bossChoice = getBossChoice();
        playRound(playerChoice, bossChoice);

        // Update the player's weapon image
        const playerWeaponImage = document.querySelector("#playerWeapon");
        const chosenWeaponImageSrc = choice.getAttribute("src");
        playerWeaponImage.src = chosenWeaponImageSrc;
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
      console.log(draw);
      // document.querySelector('.result').innerHTML = draw;
      break;
    case playerChoice === "scissors" && bossChoice === "paper":
    case playerChoice === "rock" && bossChoice === "scissors":
    case playerChoice === "paper" && bossChoice === "rock":
      increaseWins();
      console.log(success)
      // document.querySelector('.result').innerHTML = success;
      break;
    default:
      decreaseLives();
      console.log(failed);
      // document.querySelector('.result').innerHTML = failed;
      break;
  }
};

const startGame = () => {
  const gameContainer = document.querySelector("#main-container");
  const startContainer = document.querySelector("#startcontainer");
  // const loadingScreen = document.querySelector("#loading-screen");

  if (playerLives > 0) {
    gameInProgress = true;
    if (gameContainer.style.display === "none") {
      // loadingScreen.style.display = "block";

      setTimeout(() => {
        // loadingScreen.style.display = "none";
        gameContainer.style.display = "block";
        startContainer.style.display = "none";
      }, 2000); // Delay of 2000 milliseconds (2 seconds)
    }
  } else {
    console.log("GameOver")
    // document.querySelector('.result').innerHTML = "Game Over!";
    gameInProgress = false;
  }

  getPlayerChoice();
};


const decreaseLives = () => {
  playerLives--;
  console.log(playerLives);
  // document.querySelector(".lives").innerHTML = playerLives;
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

const showPlayAgainPrompt = () => {
  const playAgain = confirm("Do you want to play again?");
  if (playAgain) {
    resetGame();
    location.reload();
  } else {
    console.log("Thanks for playing!");
    location.reload();
  }
};

const resetGame = () => {
  playerLives = 3;
  playerWins = 0;
  isFinalBoss = false;
  console.log("Game reset. Starting a new game.");
  startGame();
};


