function builBoard() {
    game.innerHTML = "";
  
    for (let i = 0; i < board.length; i++) {
      const element = board[i];
      let row = document.createElement("div"); // create div for each row
      row.setAttribute("class", "row");
  
      for (let j = 0; j < element.length; j++) {
        const elmt = element[j];
        let col = document.createElement("div"); 
        let piece = document.createElement("div");
        let caseType = "";
        let occupied = "";
  
        if (i % 2 === 0) {
          if (j % 2 === 0) {
            caseType = "Whitecase";
          } else {
            caseType = "blackCase";
          }
        } else {
          if (j % 2 !== 0) {
            caseType = "Whitecase";
          } else {
            caseType = "blackCase";
          }
        }
  
        // add the piece if the case isn't empty
        if (board[i][j] === 1) {
          occupied = "whitePiece";
        } else if (board[i][j] === -1) {
          occupied = "blackPiece";
        } else {
          occupied = "empty";
        }
  
        piece.setAttribute("class", "occupied " + occupied);
  
        // set row and colum in the case
        piece.setAttribute("row", i);
        piece.setAttribute("column", j);
        piece.setAttribute("data-position", i + "-" + j);
  
        //add event listener to each piece
        piece.addEventListener("click", movePiece);
  
        col.appendChild(piece);
  
        col.setAttribute("class", "column " + caseType);
        row.appendChild(col);
  
      }
  
      game.appendChild(row);
    }
  }