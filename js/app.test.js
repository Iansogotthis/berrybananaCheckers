// Test case 1: Valid move
const event1 = {
  preventDefault: () => {},
  dataTransfer: {
    getData: () => "1,2"
  },
  target: document.createElement("div")
};
event1.target.classList = ["piece"];
event1.target.parentElement = document.createElement("div");
event1.target.parentElement.setAttribute("row", "3");
event1.target.parentElement.setAttribute("column", "4");

drop(event1);
// Expected result: The move is valid, the board is updated, and the current player is switched.

// Test case 2: Invalid move
const event2 = {
  preventDefault: () => {},
  dataTransfer: {
    getData: () => "5,6"
  },
  target: document.createElement("div")
};
event2.target.classList = [];
event2.target.parentElement = document.createElement("div");
event2.target.parentElement.setAttribute("row", "7");
event2.target.parentElement.setAttribute("column", "8");

drop(event2);
// Expected result: The move is invalid, nothing is updated, and the current player remains the same.

// Test case 3: Game over
const event3 = {
  preventDefault: () => {},
  dataTransfer: {
    getData: () => "9,10"
  },
  target: document.createElement("div")
};
event3.target.classList = ["piece"];
event3.target.parentElement = document.createElement("div");
event3.target.parentElement.setAttribute("row", "11");
event3.target.parentElement.setAttribute("column", "12");

drop(event3);
// Expected result: The move is valid, the board is updated, the current player is switched, and the game is over.// Test case 4: Build board
test("buildBoard should create the game board with correct elements", () => {
  // Arrange
  const game = document.createElement("div");
  const board = [
    [0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ];

  // Act
  buildBoard();

  // Assert
  expect(game.innerHTML).toMatchSnapshot();
});

// Test case 5: Piece drag start
test("dragStart should set the correct dataTransfer values", () => {
  // Arrange
  const event = {
    dataTransfer: {
      setData: jest.fn()
    },
    target: document.createElement("div")
  };

  // Act
  dragStart(event);

  // Assert
  expect(event.dataTransfer.setData).toHaveBeenCalledWith("text/plain", event.target.id);
});

// Test case 6: Piece drop
test("drop should update the board and switch the current player", () => {
  // Arrange
  const event = {
    preventDefault: jest.fn(),
    dataTransfer: {
      getData: () => "1,2"
    },
    target: document.createElement("div")
  };
  event.target.classList = ["piece"];
  event.target.parentElement = document.createElement("div");
  event.target.parentElement.setAttribute("row", "3");
  event.target.parentElement.setAttribute("column", "4");

  // Act
  drop(event);

  // Assert
  expect(board[3][4]).toBe(0);
  expect(board[1][2]).toBe(1);
  expect(currentPlayer).toBe(-1);
});

// Test case 7: Piece drag over
test("dragOver should prevent the default behavior", () => {
  // Arrange
  const event = {
    preventDefault: jest.fn()
  };

  // Act
  dragOver(event);

  // Assert
  expect(event.preventDefault).toHaveBeenCalled();
});// Test case 8: Build board
test("buildBoard should create the game board with correct elements", () => {
  // Arrange
  const game = document.createElement("div");
  const board = [
    [0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ];

  // Act
  buildBoard();

  // Assert
  expect(game.innerHTML).toMatchSnapshot();
});

// Test case 9: Piece drag start
test("dragStart should set the correct dataTransfer values", () => {
  // Arrange
  const event = {
    dataTransfer: {
      setData: jest.fn()
    },
    target: document.createElement("div")
  };

  // Act
  dragStart(event);

  // Assert
  expect(event.dataTransfer.setData).toHaveBeenCalledWith("text/plain", event.target.id);
});

// Test case 10: Piece drop
test("drop should update the board and switch the current player", () => {
  // Arrange
  const event = {
    preventDefault: jest.fn(),
    dataTransfer: {
      getData: () => "1,2"
    },
    target: document.createElement("div")
  };
  event.target.classList = ["piece"];
  event.target.parentElement = document.createElement("div");
  event.target.parentElement.setAttribute("row", "3");
  event.target.parentElement.setAttribute("column", "4");

  // Act
  drop(event);

  // Assert
  expect(board[3][4]).toBe(0);
  expect(board[1][2]).toBe(1);
  expect(currentPlayer).toBe(-1);
});

// Test case 11: Piece drag over
test("dragOver should prevent the default behavior", () => {
  // Arrange
  const event = {
    preventDefault: jest.fn()
  };

  // Act
  dragOver(event);

  // Assert
  expect(event.preventDefault).toHaveBeenCalled();
});