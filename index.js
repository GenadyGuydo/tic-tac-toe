const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let boxIndexValues = new Array(9).fill("");

let nextMove = "X";
let gameOver = false;
 const reset = document.querySelector('.reset')

 reset.addEventListener( "click", ()=>{
    location.reload()
 } )
const winnerMessageElement = document.querySelector(".winner");
const nextMoveElement = document.querySelector(".turn");

const winnerMessage = () => `Winner is ${nextMove}`;
const nextMoveMessage = () => `Next move ${nextMove}`;

document
  .querySelectorAll(".box")
  .forEach((box) => box.addEventListener("click", (event) => handleBoxClick(event)));

function handleBoxClick(event) {
  const target = event.target;
  const boxIndex = target.dataset.boxIndex;
  if (gameOver || boxIndexValues[boxIndex] != "") {
    return;
  } else {
    boxIndexValues[boxIndex] = nextMove;
    target.innerHTML = nextMove;
    checWinner();
    changeNextMove();
  }
}
function changeNextMove() {
  nextMove = nextMove === "X" ? "0" : "X";
  nextMoveElement.innerHTML = nextMoveMessage();
}

function checWinner() {
  for (let i = 0; i <= 7; i++) {
    const winningCondition = winningConditions[i];
    if (
     boxIndexValues[winningCondition[0]] == "" ||
     boxIndexValues[winningCondition[1]] == "" ||
     boxIndexValues[winningCondition[2]] == ""
    ) {
      gameOver = false;
      continue;
    }
    if (
      boxIndexValues[winningCondition[0]] == boxIndexValues[winningCondition[1]] &&
      boxIndexValues[winningCondition[1]] == boxIndexValues[winningCondition[2]]
    ) {
      gameOver = true;
      winnerMessageElement.innerHTML = winnerMessage();
      break;
    }
  }

  if (!boxIndexValues.includes("") && !gameOver) {
    winnerMessageElement.innerHTML = "Draw.";
  }
}
