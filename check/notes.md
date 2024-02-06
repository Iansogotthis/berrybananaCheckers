Here is one way to start moving pieces on a checkerboard in HTML/CSS/JavaScript:

Create HTML table with alternating light and dark cells to represent the checkerboard. Give each cell an id like "cell-1-1" for row 1, column 1.

Use CSS to style the table and cells. Make the dark cells a different color.

Render the checker pieces as divs with a class like "piece". Position them absolutely within the cells.

In JavaScript, store the pieces in an array. Each piece object could contain properties like:

{
  id: 'piece-1', 
  position: 'cell-1-1', 
  color: 'red' 
}



Here is how you can add click event listeners to the cells to check if they contain a piece matching the current player's color:

Get all the cell elements, for example using querySelectorAll():
const cells = document.querySelectorAll('.cell');



Loop through the cells and add a click event listener to each one:
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick); 
});


Define the handleCellClick callback function:
function handleCellClick(e) {
  // Check if this cell contains a piece  
  const piece = e.target.querySelector('.piece');

  // If no piece, exit
  if(!piece) return;

  // Get current player color
  const currentPlayerColor = 'red';
  
  // Check if piece color matches 
  if(piece.classList.contains(currentPlayerColor)) {
    // This is the current player's piece
    
    // Select this piece
    piece.classList.add('selected');
    
    // Remove selected from other pieces
    document.querySelectorAll('.selected').forEach(el 


Inside the click handler, check if the cell contains a piece. If so, check if the piece's color class matches the current player's color.

If there is a match, you can mark that piece as selected, such as by adding a 'selected' class.

This allows you to identify when the player clicks on one of their own pieces to select it.
If so, store that piece as the "selected" piece. Add a class to highlight it as selected.

Add event listeners to the other cells to handle moving. On click of a new cell, check if there is a selected piece that can move there.

If so, update its position property and move the DOM element to the new cell.

Alternate turns between players and disable clicking for the opponent.

This allows clicking a piece to select it, then clicking a new cell to move it there. You can add more logic for game rules, capturing pieces, turn taking, win conditions etc.