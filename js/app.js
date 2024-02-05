function buildBoard() {
  // Clear the game board
  game.innerHTML = "";

  // Iterate over the board array
  for (let i = 0; i < board.length; i++) {
    // Create a div for each row
    const row = document.createElement("div");
    row.setAttribute("class", "row");

    // Iterate over the elements in the current row
    for (let j = 0; j < board[i].length; j++) {
      // Create a div for each column
      const column = document.createElement("div");
      column.setAttribute("class", "column");

      // Create a div for each piece
      const piece = document.createElement("div");
      piece.setAttribute("class", "piece");

      // Set the case type based on the row and column indices
      let caseType;
      if (i % 2 === 0) {
        if (j % 2 === 0) {
          caseType = "whiteCase";
        } else {
          caseType = "blackCase";
        }
      } else {
        if (j % 2 !== 0) {
          caseType = "whiteCase";
        } else {
          caseType = "blackCase";
        }
      }

      // Set the occupied status of the piece
      let occupied;
      if (board[i][j] === 1) {
        occupied = "whitePiece";
      } else if (board[i][j] === -1) {
        occupied = "blackPiece";
      } else {
        occupied = "empty";
      }

      // Set the attributes of the piece
      piece.setAttribute("row", i);
      piece.setAttribute("column", j);
      piece.setAttribute("data-position", `${i}-${j}`);
      piece.classList.add(occupied, caseType);

      // Add an event listener to the piece
      piece.addEventListener("click", movePiece);

      // Append the piece to the column
      column.appendChild(piece);

      // Append the column to the row
      row.appendChild(column);
    }

    // Append the row to the game board
    game.appendChild(row);
  }
}
function movePiece(event) {
  // Get the current position of the piece being moved
  const piece = event.target;
  const currentRow = parseInt(piece.getAttribute("row"));
  const currentColumn = parseInt(piece.getAttribute("column"));

  // Get the position of the square that the piece is being moved to
  const targetSquare = event.currentTarget;
  const targetRow = parseInt(targetSquare.getAttribute("row"));
  const targetColumn = parseInt(targetSquare.getAttribute("column"));

  // Check if the move is valid
  if (isValidMove(currentRow, currentColumn, targetRow, targetColumn)) {
    // Update the board array to reflect the new positions of the pieces
    board[currentRow][currentColumn] = 0;
    board[targetRow][targetColumn] = 1;
    if (isGameOver()) {

      alert(`Game over. Player ${currentPlayer === 1 ? 2 : 1} wins.`)
      const playAgain = confirm("Do you want to play again?");
      if (playAgain) {
        // If they accept, reset the game board and the current player
        board = createInitialBoard(); // You need to implement this function
        currentPlayer = 1;
        buildBoard();
      }
    } else {
      // If the game is not over, switch the current player's turn
      currentPlayer = currentPlayer === 1 ? 2 : 1;

      // Update the game board UI to reflect the new positions of the pieces
      piece.setAttribute("row", targetRow);
      piece.setAttribute("column", targetColumn);
      targetSquare.appendChild(piece);
    }
  }

}
function movePiece(event) {
  // Check if it is the current player's turn
  if (currentPlayer === 1) {
    // Get the current position of the piece being moved
    const piece = event.target;
    const currentRow = parseInt(piece.getAttribute("row"));
    const currentColumn = parseInt(piece.getAttribute("column"));

    // Get the position of the square that the piece is being moved to
    const targetSquare = event.currentTarget;
    const targetRow = parseInt(targetSquare.getAttribute("row"));
    const targetColumn = parseInt(targetSquare.getAttribute("column"));

    // Check if the move is valid
    if (isValidMove(currentRow, currentColumn, targetRow, targetColumn)) {
      // Update the board array to reflect the new positions of the pieces
      board[currentRow][currentColumn] = 0;
      board[targetRow][targetColumn] = 1;
      if (isGameOver()) {
        // If the game is over, display a message to the users
        alert(`Game over. Player ${currentPlayer === 1 ? 2 : 1} wins.`);

        // Offer the users to start a new game
        const playAgain = confirm("Do you want to play again?");
        if (playAgain) {
          // If they accept, reset the game board and the current player
          board = createInitialBoard(); // You need to implement this function
          currentPlayer = 1;
          buildBoard();
        }
      } else {
        // If the game is not over, switch the current player's turn
        currentPlayer = currentPlayer === 1 ? 2 : 1;
      }


      // Update the game board UI to reflect the new positions of the pieces
      piece.setAttribute("row", targetRow);
      piece.setAttribute("column", targetColumn);
      targetSquare.appendChild(piece);

      // Switch the current player's turn
      currentPlayer = 2;

      // Display the current player's turn to the user
      document.getElementById("currentPlayer").innerHTML = `Current player: ${currentPlayer}`;
    } else {
      // Display an error message to the user
      alert("Invalid move. Please try again.");
    }
  } else {
    // Display an error message to the user
    alert("It is not your turn.");
  }
}
/*am here*/
function isValidMove(currentRow, currentColumn, targetRow, targetColumn) {
  // Check if the target position is empty
  if (board[targetRow][targetColumn] !== 0) {
    return false;
  }

  // Check if the move is diagonal
  if (Math.abs(targetRow - currentRow) !== Math.abs(targetColumn - currentColumn)) {
    return false;
  }

  // Check if the piece is jumping over another piece
  const middleRow = (currentRow + targetRow) / 2;
  const middleColumn = (currentColumn + targetColumn) / 2;
  if (board[middleRow][middleColumn] !== 0) {
    // If it is, check if the jumped piece belongs to the opponent
    if (board[middleRow][middleColumn] !== -currentPlayer) {
      return false;
    }
  }

  // If all checks pass, the move is valid
  return true;

}


function isGameOver() {
  // Iterate over the entire board
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      // Check if the piece belongs to the current player
      if (board[i][j] === currentPlayer) {
        // Check for any valid moves
        for (let rowDiff = -1; rowDiff <= 1; rowDiff++) {
          for (let colDiff = -1; colDiff <= 1; colDiff++) {
            if (isValidMove(i, j, i + rowDiff, j + colDiff)) {
              // If a valid move is found, the game is not over
              return false;
            }
          }
        }
      }
    }
  }

  // If no valid moves are found, the game is over
  return true;
}