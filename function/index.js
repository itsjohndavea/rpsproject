let playerLives = 3;
const bossLife = 5;
const weapons = ["rock", "paper", "scissors"];
let isFinalBoss = false;
let playerWins = 0;
let gameInProgress = false;
const bossWeaponImage = document.querySelector(".boss-weapon");
const choiceWeapons = document.querySelectorAll(".choice-weapon");
const gameContainer = document.querySelector("#main-container");
const startContainer = document.querySelector("#startcontainer");


window.addEventListener('load', function() {
  var loadingScreen = document.getElementById('loading-screen');
  var content = document.getElementById('content');
  loadingScreen.style.display = 'none';
});
const getBossChoice = () => {
  if (isFinalBoss) {
    const finalBossWeapons = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * finalBossWeapons.length);
    const bossChoice = finalBossWeapons[randomIndex];
    // Update boss weapon image
    bossWeaponImage.setAttribute("src", `assets/images/${bossChoice}.png`);
    return bossChoice;
  } else {
    const botWeapon = weapons[Math.floor(Math.random() * weapons.length)];
    // Update boss weapon image
    bossWeaponImage.setAttribute("src", `assets/images/${botWeapon}.png`);
    return botWeapon;
  }
};
const getPlayerChoice = () => {
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
const increaseWins = () => {
  playerWins++;
  const bossImage = document.querySelector(".boss");
  console.log(`Player wins: ${playerWins}`);
  if (playerWins === 1) {
    const bossImage = document.querySelector(".boss");
    bossWeaponImage.src = `assets/images/questionmark.png`;
    const bossImagePath = `assets/images/boss/serdin/mini2.webp`;
    bossImage.src = bossImagePath;
  }
  else if(playerWins === 2) {
    bossWeaponImage.src = `assets/images/questionmark.png`;
    const bossImagePath = `assets/images/boss/serdin/mini3.png`;
    bossImage.src = bossImagePath;
  }
  else if(playerWins === 3) {
    bossWeaponImage.src = `assets/images/questionmark.png`;
    const bossImagePath = `assets/images/boss/serdin/mini4.webp`;
    bossImage.src = bossImagePath;
  }
  else if (playerWins === 4) {
    document.body.classList.add('blur-effect');
    setTimeout(() => {
      window.location.assign("final_boss.html");
    }, 5000);
  } else if (playerWins === 5) {
    const bossImage = document.querySelector(".boss");
    const bossImagePath = "assets/images/boss/serdin/finalboss.webp";
    bossImage.src = bossImagePath;
  }else{
    showPlayAgainPrompt();
  }
};
//Modals
const openModalButton = document.getElementById('openModalButton');
const closeModalButton = document.getElementById('closeModalButton');
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');

openModalButton.addEventListener('click', function() {
  showModal("Draw", "You both used scissors");
});

closeModalButton.addEventListener('click', function() {
  hideModal();
});

const showModal = (title, message, resultClass) => {
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  modalMessage.className = resultClass;
  modalOverlay.style.display = 'flex';
};

const hideModal = () => {
  modalOverlay.style.display = 'none';
};

const playRound = (playerChoice, bossChoice) => {
  const success = `Impressive! You won! You used ${playerChoice}, and your opponent used ${bossChoice}`;
  const failed = `You lost! You used ${playerChoice}, and your opponent used ${bossChoice}`;
  const draw = `Draw! You both used ${playerChoice}`;
  const success2 = `Impressive! You won! 1 more to go in final boss`;
  const success3 = `You'll be directing final boss`;

  switch (true) {
    case playerChoice === bossChoice:
      showModal("Draw", draw, "draw");
      break;
    case playerChoice === "scissors" && bossChoice === "paper":
    case playerChoice === "rock" && bossChoice === "scissors":
    case playerChoice === "paper" && bossChoice === "rock":
      increaseWins();
      if(playerWins === 3){
        showModal("Success", success, "success");
      }else if(playerWins <= 2){
        showModal("Success", success2, "success");
      }
      else if(playerWins === 4){
        showModal("Success", success3, "success");
      }
      break;
    default:
      showModal("Failed", failed, "failed");
      decreaseLives();
      break;
  }
};

const startGame = () => {
  if (playerLives > 0) {
    gameInProgress = true;
    if (gameContainer.style.display === "none") {
      setTimeout(() => {
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
  document.querySelector(".lives").innerHTML = "HP: " + playerLives;
};


const decreaseLives = () => {
  playerLives--;
  document.querySelector(".lives").innerHTML = "HP: " + playerLives;
  if (playerLives === 0) {
    console.log("Game over! You have no more lives.");
    showPlayAgainModal();
  }
};



const showPlayAgainPrompt = () => {
  showPlayAgainModal();
};

const resetGame = () => {
  location.reload();
  playerLives = 3;
  playerWins = 0;
  isFinalBoss = false;
  console.log("Game reset. Starting a new game.");
  startGame();
};
const playAgainButton = document.getElementById('playAgainButton');
const playAgainYesButton = document.getElementById('playAgainYes');
const playAgainNoButton = document.getElementById('playAgainNo');
const playAgainModal = document.getElementById('playAgainModal');

playAgainButton.addEventListener('click', function() {
  showPlayAgainPrompt();
});

playAgainYesButton.addEventListener('click', function() {
  resetGame();
  hidePlayAgainModal();
});

playAgainNoButton.addEventListener('click', function() {
  resetGame();
  hidePlayAgainModal();
});

const showPlayAgainModal = () => {
  playAgainModal.style.display = 'flex';
  
};

const hidePlayAgainModal = () => {
  playAgainModal.style.display = 'none';
};



