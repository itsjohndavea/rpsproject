const playerLife = 5;
const botLife = 5;
const round = 0;

const playerSelection = "rock";
const getComputerChoice = () =>{
    const weapons = ["rock", "paper", "scissors"];
    let botWeapon = weapons[Math.floor(Math.random() * weapons.length)];
    return botWeapon;
}
const computerSelection = getComputerChoice();
const playRound = (playerSelection, computerSelection) =>{
    switch(true){
        case (playerSelection === computerSelection):
            console.log("draw!");
            break;
        case (playerSelection === "scissors" && computerSelection === "paper"):
        case (playerSelection === "rock" && computerSelection === "scissors"):
        case (playerSelection === "papers" && computerSelection === "rock"):
            console.log(`Impressive! you won! you used ${playerSelection} and your opponent used ${computerSelection}`);
            break;
        default:
            console.log(`You lost! you used ${playerSelection} and your opponent used ${computerSelection}`);
            break;
    }
}

console.log(playRound(playerSelection, computerSelection));