// Game board
const board = document.getElementById('game-board');

// Game info 
const info = {
    currentPlayer: document.getElementById('current-player'),
    redPieces: document.getElementById('red-pieces'),
    blackPieces: document.getElementById('black-pieces')
};

// Game state
function initialize() {
    const state = {
        pieces: {
            red: 12,
            black: 12
        },
        players: ['red', 'black'],
        currentPlayer: 'red'
    };
}


// Generate board
function generateBoard() {
    // Loop through rows
    for (let row = 0; row < 8; row++) {
        // Loop through columns 
        for (let col = 0; col < 8; col++) {
            // Create cell
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;

            // Add black background on black cells
            if ((row + col) % 2 === 1) {
                cell.classList.add('black');
            }

            // Add click handler
            cell.addEventListener('click', handleCellClick);

            // Add cell to board
            board.appendChild(cell);
        }
    }
}

// Handle cell click
function handleCellClick(e) {
    // Get cell
    const cell = e.target;

    // Get row and col
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    // Check for piece to move
    const pieces = document.querySelectorAll('.piece');
    pieces.forEach(p => {
        if (p.dataset.row == row && p.dataset.col == col) {
            // Select this piece
            selectPiece(p);
        }
    });

    // Select destination cell
    selectCell(cell);
}

// Select piece
function selectPiece(piece) {
    // Remove previous selected
    document.querySelectorAll('.piece.selected')
        .forEach(p => p.classList.remove('selected'));

    // Select new piece
    piece.classList.add('selected');
}

// Select cell
function selectCell(cell) {
    // Remove previous selected
    document.querySelectorAll('.cell.selected')
        .forEach(c => c.classList.remove('selected'));

    // Select new cell
    cell.classList.add('selected');
}

// Update game info
function updateInfo() {
    info.currentPlayer.textContent = state.currentPlayer;
    info.redPieces.textContent = state.pieces.red;
    info.blackPieces.textContent = state.pieces.black;
}

// Initialize game
function init() {

    // Generate board
    generateBoard();
  
    // Place pieces
    placePieces();
  
    // Update UI
    updateInfo();
  
  }
  
  // Place pieces in starting positions 
  function placePieces() {
  
    // Loop through rows
    for(let row = 0; row < 3; row++) {
  
      // Loop through cols
      for(let col = 0; col < 8; col++) {
  
        // Check if cell should have piece
        if(row % 2 === col % 2) {
  
          // Get cell
          const cell = document.querySelector(`div[data-row="${row}"][data-col="${col}"]`);
          
          // Add red pieces
          if(row < 2) {
            placePiece('red', cell);
          }
  
          // Add black pieces 
          else {
            placePiece('black', cell);
          }
        }
      } 
    }
  }
  
  // Place a piece in a cell
  function placePiece(color, cell) {
  
    // Create piece
    const piece = document.createElement('div');
    piece.classList.add('piece', color);
    piece.dataset.row = cell.dataset.row;
    piece.dataset.col = cell.dataset.col;
  
    // Add to cell
    cell.appendChild(piece); 
  
  }
  
  // Start game
  function startGame() {
    
    // Initialize
    init();
  
    // Rest of game start logic...
  
  }
  
  // Start game on page load
  startGame();