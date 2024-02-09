Checkers Game
This is a simple implementation of the classic board game, Checkers, using HTML, CSS, and JavaScript.

Game Rules
The game is played on an 8x8 board with alternating black and white squares.
Each player starts with 12 pieces on the dark squares of the board.
The pieces move diagonally and can only move forward towards the opponent's side of the board.
If a player's piece reaches the opposite side of the board, it becomes a King. Kings can move both forward and backward.
A player can capture an opponent's piece by jumping over it to an empty square on the other side.
The game ends when a player has no more valid moves, either because all their pieces have been captured or they are blocked from moving.


How to Play
Open the index.html file in a web browser to start the game.
Click and drag a piece to move it. Only valid moves will be allowed.
The current scores are displayed on the page. A player scores a point each time they capture an opponent's piece.
Code Structure
app.js: This file contains the JavaScript code that controls the game logic. It defines the game board, handles the drag and drop events for moving pieces, checks if a move is valid, and updates the game state.
index.html: This file contains the HTML structure of the game board.
styles.css: This file contains the CSS styles for the game board and pieces.
Future Improvements
Add a feature to highlight valid moves when a piece is selected.
Implement a simple AI for single player mode.
Add animations for piece movements and captures.
Improve the UI design for a better gaming experience.
