describe("movePiece", () => {
  beforeEach(() => {
    // Reset the game board and the current player before each test
    board = createInitialBoard();
    currentPlayer = 1;
  });

  it("should move a piece to a valid target square", () => {
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

    // Check if the piece has been moved to the target square
    expect(board[2][2]).toBe(0);
    expect(board[3][3]).toBe(1);
    expect(event.target.getAttribute("row")).toBe("3");
    expect(event.target.getAttribute("column")).toBe("3");
    expect(event.currentTarget.children.length).toBe(1);
  });

  it("should switch the current player's turn after a valid move", () => {
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

    // Check if the current player's turn has been switched
    expect(currentPlayer).toBe(2);
    expect(document.getElementById("currentPlayer").innerHTML).toBe("Current player: 2");
  });

  it("should display an error message for an invalid move", () => {
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

    // Call the movePiece function
    movePiece(event);

    // Check if an error message has been displayed
    expect(alert).toHaveBeenCalledWith("Invalid move. Please try again.");
  });

  it("should display an error message when it is not the current player's turn", () => {
    // Set up the initial board state
    board[2][2] = 1;
    currentPlayer = 2;

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

    // Check if an error message has been displayed
    expect(alert).toHaveBeenCalledWith("It is not your turn.");
  });

  it("should end the game and display a message when the game is over", () => {
    // Set up the initial board state
    board[2][2] = 1;
    board[3][3] = 2;

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

    // Check if a game over message has been displayed
    expect(alert).toHaveBeenCalledWith("Game over. Player 2 wins.");

    // Check if the game board and the current player have been reset
    expect(board).toEqual(createInitialBoard());
    expect(currentPlayer).toBe(1);

    // Check if the buildBoard function has been called
    expect(buildBoard).toHaveBeenCalled();
  });

  it("should offer the users to start a new game when the game is over", () => {
    // Set up the initial board state
    board[2][2] = 1;
    board[3][3] = 2;

    // Create a mock event object
    const event = {
      target: document.createElement("div"),
      currentTarget: document.createElement("div")
    };
    event.target.setAttribute("row", "2");
    event.target.setAttribute("column", "2");
    event.currentTarget.setAttribute("row", "3");
    event.currentTarget.setAttribute("column", "3");

    // Mock the confirm function to simulate user acceptance
    window.confirm = jest.fn(() => true);

    // Call the movePiece function
    movePiece(event);

    // Check if the createInitialBoard function has been called
    expect(createInitialBoard).toHaveBeenCalled();
  });
});