
remaining goals feb 8th
implement drag n drop
display scoreboard w/ dynamic render
fix background image (want animated)
music




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

          copy
          
With this change, the isValidMove function should correctly validate the moves, and the “Wrong move” prompt should no longer appear.
