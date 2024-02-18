// Define the game board and current player variables
let board = createInitialBoard();
let currentPlayer = 1;

// Get the game board element
const game = document.getElementById("game");
const WHITE_KING = 2;
const BLACK_KING = -2;

function createInitialBoard() {
  const board = [];
  for (let i = 0; i < 8; i++) {
    const row = [];
    for (let j = 0; j < 8; j++) {
      if ((i < 3 || i > 4) && (i + j) % 2 === 1) {
        row.push(i < 3 ? 1 : -1);
      } else {
        row.push(0);
      }
    }
    board.push(row);
  }
  return board;
}

// Build the game boar
buildBoard();

// Function to build the game board
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
      column.setAttribute("id", `column-${i}-${j}`);
      column.setAttribute("row", i);
      column.setAttribute("column", j);

      // Add event listener for drop event to the column
      column.addEventListener("drop", drop);
      column.addEventListener("dragover", dragOver);

      // Create a div for each piece
      const piece = document.createElement("div");
      piece.setAttribute("class", "piece");
      piece.setAttribute("draggable", "true"); // Add draggable attribute
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
      } else if (board[i][j] === BLACK_KING) {
        occupied = "king_b";
      } else if (board[i][j] === WHITE_KING) {
        occupied = "king_r";
      } else {
        occupied = "empty";
      }

      // Set the attributes of the piece
      piece.setAttribute("id", `piece-${i}-${j}`);
      piece.setAttribute("row", i);
      piece.setAttribute("column", j);
      piece.setAttribute("data-position", `${i}-${j}`);
      piece.classList.add(occupied, caseType);

      // Add event listeners for drag events
      piece.addEventListener("dragstart", dragStart);
      piece.addEventListener("dragover", dragOver);
      piece.addEventListener("dragenter", dragEnter);
      piece.addEventListener("dragleave", dragLeave);
      piece.addEventListener("drop", drop);

      // Append the piece to the column
      column.appendChild(piece);

      // Append the column to the row
      row.appendChild(column);
    }

    // Append the row to the game board
    game.appendChild(row);
  }
}
// Drag event handlers
function dragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}

function dragOver(event) {
  event.preventDefault();
}

function dragEnter(event) {
  event.preventDefault();
}

function dragLeave(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text/plain");
  const sourcePiece = document.getElementById(data);
  let targetColumn = event.target;

  // If the target is a piece, get the parent column
  if (targetColumn.classList.contains("piece")) {
    targetColumn = targetColumn.parentElement;
  }

  // Update the game board based on the move
  const sourceRow = parseInt(sourcePiece.getAttribute("row"));
  const sourceColumn = parseInt(sourcePiece.getAttribute("column"));
  const targetRow = parseInt(targetColumn.getAttribute("row"));
  const targetColumnNum = parseInt(targetColumn.getAttribute("column"));
  const pieceValue = board[sourceRow][sourceColumn];

  // Check if the move is valid
  if (!isValidMove(sourceRow, sourceColumn, targetRow, targetColumnNum)) {
    return;
  }

  // Check if the piece is jumping over another piece
  const middleRow = Math.floor((sourceRow + targetRow) / 2);
  const middleColumn = Math.floor((sourceColumn + targetColumnNum) / 2);
  if (board[middleRow][middleColumn] !== 0) {
    // If it is, remove the jumped piece from the board
    board[middleRow][middleColumn] = 0;

    // Increment the score of the current player
    if (currentPlayer === 1) {
      whiteScore++;
    } else {
      blackScore++;
    }
  }

  // Update the board array
  board[sourceRow][sourceColumn] = 0;
  board[targetRow][targetColumnNum] = pieceValue;

  // Update the classes of the source and target pieces
  sourcePiece.classList.remove("whitePiece", "blackPiece", "king_b", "king_r");
  sourcePiece.classList.add("empty");

  // Update the attributes of the target piece
  targetColumn.firstChild.setAttribute("row", targetRow);
  targetColumn.firstChild.setAttribute("column", targetColumnNum);
  targetColumn.firstChild.classList.add(pieceValue === 1 ? "whitePiece" : "blackPiece");

  // Switch the current player
  currentPlayer = -currentPlayer;

  // Rebuild the board
  buildBoard();
}
// Function to check if a move is valid
function isValidMove(currentRow, currentColumn, targetRow, targetColumn) {
  // Check if the target position is empty
  if (board[targetRow][targetColumn] !== 0) {
    return false;
  }

  // Check if the move is diagonal
  const rowDiff = Math.abs(targetRow - currentRow);
  const colDiff = Math.abs(targetColumn - currentColumn);
  if (rowDiff !== colDiff) {
    return false;
  }

  // Check if the piece is moving forward (for normal pieces)
  const piece = board[currentRow][currentColumn];
  if (piece === 1 && targetRow <= currentRow) {
    return false;
  }
  if (piece === -1 && targetRow >= currentRow) {
    return false;
  }

  // Check if the piece is jumping over another piece
  const middleRow = Math.floor((currentRow + targetRow) / 2);
  const middleColumn = Math.floor((currentColumn + targetColumn) / 2);
  if (board[middleRow][middleColumn] !== 0) {
    // If it is, check if the jumped piece belongs to the opponent
    if (board[middleRow][middleColumn] !== -currentPlayer) {
      return false;
    }
  }

  // If all checks pass, the move is valid
  return true;
}
// Function to check if the game is over
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

// Function to check if the game is won
