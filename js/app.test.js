describe("movePiece", () => {
  beforeEach(() => {
    // Reset the game board and the current player before each test
    board = createInitialBoard();
    currentPlayer = 1;
  });

  it("should update the board array and switch the current player's turn when a valid move is made", () => {
    // Set up the initial board state
    board[2][2] = 1;

    // Create a mock event object
    const event = {
      target: document.createElement("div"),
      currentTarget: document.createElement("div")
    };
    event.target.setAttribute("row", "2");
    event.target.setAttribute("column", "2");
    event.currentTarget.setAttribute("row", "3");
    event.currentTarget.setAttribute("column", "3");

    // Call the movePiece function
    movePiece(event);

    // Check if the board array has been updated correctly
    expect(board[2][2]).toBe(0);
    expect(board[3][3]).toBe(1);

    // Check if the current player has been switched
    expect(currentPlayer).toBe(2);
  });

  it("should display a game over message and offer to start a new game when the game is over", () => {
    // Set up the board state for a game over scenario
    board[0][0] = 1;
    board[1][1] = 2;

    // Create a mock event object
    const event = {
      target: document.createElement("div"),
      currentTarget: document.createElement("div")
    };
    event.target.setAttribute("row", "0");
    event.target.setAttribute("column", "0");
    event.currentTarget.setAttribute("row", "1");
    event.currentTarget.setAttribute("column", "1");

    // Mock the alert and confirm functions
    window.alert = jest.fn();
    window.confirm = jest.fn(() => true);

    // Call the movePiece function
    movePiece(event);

    // Check if the game over message has been displayed
    expect(window.alert).toHaveBeenCalledWith("Game over. Player 2 wins.");

    // Check if the confirm dialog has been shown
    expect(window.confirm).toHaveBeenCalledWith("Do you want to play again?");

    // Check if the board and current player have been reset
    expect(board).toEqual(createInitialBoard());
    expect(currentPlayer).toBe(1);
  });

  it("should display an error message when an invalid move is made", () => {
    // Set up the initial board state
    board[2][2] = 1;

    // Create a mock event object
    const event = {
      target: document.createElement("div"),
      currentTarget: document.createElement("div")
    };
    event.target.setAttribute("row", "2");
    event.target.setAttribute("column", "2");
    event.currentTarget.setAttribute("row", "4");
    event.currentTarget.setAttribute("column", "4");

    // Mock the alert function
    window.alert = jest.fn();

    // Call the movePiece function
    movePiece(event);

    // Check if the error message has been displayed
    expect(window.alert).toHaveBeenCalledWith("Invalid move. Please try again.");
  });

  it("should display an error message when it is not the current player's turn", () => {
    // Set the current player to 2
    currentPlayer = 2;

    // Create a mock event object
    const event = {
      target: document.createElement("div"),
      currentTarget: document.createElement("div")
    };

    // Mock the alert function
    window.alert = jest.fn();

    // Call the movePiece function
    movePiece(event);

    // Check if the error message has been displayed
    expect(window.alert).toHaveBeenCalledWith("It is not your turn.");
  });
});