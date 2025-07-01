const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.style.color = currentPlayer === "X" ? "#ff3e3e" : "#007bff";

  const winResult = checkWinner();
  if (winResult) {
    winResult.forEach(i => cells[i].classList.add("winner"));
    statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusText.textContent = "😐 It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `🔄 Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return pattern; // Return winning indices
    }
  }
  return null;
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.style.color = "#333";
    cell.classList.remove("winner");
    cell.style.animation = "popIn 0.4s ease";
  });
  statusText.textContent = `🕹️ Player ${currentPlayer}'s turn`;
}

statusText.textContent = `🕹️ Player ${currentPlayer}'s turn`;
