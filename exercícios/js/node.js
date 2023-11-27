document.addEventListener("DOMContentLoaded", () => {
    const boardElement = document.getElementById("board");
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    function createCell(index) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = index;
        cell.addEventListener("click", () => handleCellClick(index));
        return cell;
    }

    function renderBoard() {
        boardElement.innerHTML = "";
        gameBoard.forEach((value, index) => {
            const cell = createCell(index);
            cell.textContent = value;
            boardElement.appendChild(cell);
        });
    }

    function handleCellClick(index) {
        if (gameBoard[index] === "" && !checkWinner()) {
            gameBoard[index] = currentPlayer;
            renderBoard();
            if (checkWinner()) {
                alert(`Jogador ${currentPlayer} ganhou!`);
            } else if (gameBoard.every(cell => cell !== "")) {
                alert("Deu velha!");
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return true;
            }
        }

        return false;
    }

    renderBoard();
});
