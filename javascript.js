const moves = 5
const movesList = ["rock", "paper", "scissors"]

const totalRounds = 5
let roundCount = 1
let winCount = 0
let lossCount = 0


const gameButtons = document.querySelectorAll(".game-button")
gameButtons.forEach((button) => {
    button.addEventListener("click", () => {
        game(button.textContent.trim().toLowerCase())

    })
})

const currentGameResultsDiv = document.querySelector(".game-stats-counter")

updateGameResultsDiv()

const currentMoveResultsDiv = document.querySelector(".move-result")

updateMoveResult("")

const endOfGameDiv = document.querySelector(".end-of-game")


function updateGameResultsDiv(){
    currentGameResultsDiv.textContent = `Current Round: ${roundCount}/${totalRounds}, ${winCount} Wins, ${lossCount} Losses`
}

function updateMoveResult(newMoveResult) {
    currentMoveResultsDiv.textContent = newMoveResult
}

function determineWinner(playerMove, computerMove){
    let moveStatus = "None"
    console.log(playerMove, computerMove)
    if (playerMove === "paper" && computerMove === "rock"){
        moveStatus = "win"
    } else if (playerMove === "rock" && computerMove === "scissors"){
        moveStatus = "win"
    } else if (playerMove === "scissors" && computerMove === "paper"){
        moveStatus = "win"
    } else {
        if (playerMove !== computerMove){
            moveStatus = "lose"
        } else {
            moveStatus = "draw"
        }
    }

    playerMove = capitalize(playerMove)
    computerMove = capitalize(computerMove)

    let res = ""
    if (moveStatus === "win") {
        res += `You Win! ${playerMove} beats ${computerMove}`
    } else if (moveStatus === "lose") {
        res += `You Lost! ${computerMove} beats ${playerMove}`
    } else if (moveStatus === "draw") {
        res += `Draw! Both You and the Computer picked ${playerMove}`
    } else {
        alert("error")
    }
    return [moveStatus, res]
}

function getComputerMove(){
    return movesList[Math.floor(Math.random() * 3)]
}

function game(playerMove) {

    let computerMove = getComputerMove()
    let moveRes = determineWinner(playerMove, computerMove)

    console.log(`computer: ${computerMove}, player: ${playerMove}, res: ${moveRes}`)
    if (moveRes[0] === "win") {
        winCount++
    } else {
        lossCount++
    }

    updateGameResultsDiv()

    updateMoveResult(moveRes[1])

    endGame()
    roundCount++

}

function endGame(){
    if (roundCount >= totalRounds){

        gameButtons.forEach((button) => {
            button.disabled = true
        })
        if (winCount > lossCount){
            endOfGameDiv.textContent = "Congratulations! You beat the pesky computer AI!"
        } else {
            endOfGameDiv.textContent = "I'm sorry, but I think You lost..."
        }

        let retryButton = document.createElement("button")
        retryButton.textContent = "Retry"
        retryButton.addEventListener("click", () => {
            window.location.reload()
        })
        retryButton.classList.add("retry-button")

        endOfGameDiv.appendChild(retryButton)
    }
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function runRandomCycles(cyclesCount) {
    let rocks = 0
    let papers = 0
    let scissors = 0

    for (let i = 0; i < cyclesCount; i++) {
        let move = getComputerMove()
        if (move === "rock") rocks++
        if (move === "paper") papers++
        if (move === "scissors") scissors++
        console.log(getComputerMove())
    }

    console.log(rocks, papers, scissors)
    console.log(rocks / cyclesCount * 100, papers / cyclesCount * 100, scissors / cyclesCount * 100)
}




