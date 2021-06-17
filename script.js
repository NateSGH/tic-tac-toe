const gameResContainer = document.querySelector(".game-result-container");
const gameResText = document.querySelector(".game-result");

// Modules
const gameBoard = (() => {
  let array = [];
  const fill = () => {
    const squares = document.querySelectorAll(".square");
    squares.forEach((square, index) => {
      square.textContent = array[index];
    });
  };
  const reset = () => {
    const squares = document.querySelectorAll(".square");
    array = [];

    squares.forEach((square, index) => {
      square.textContent = "";
    });
  };

  return { array, fill, reset };
})();

const displayController = (() => {
  const calcResultCoords = () => {
    let coords = document.getElementById("square4").getBoundingClientRect();
    let coordLeft = (coords.left + coords.right) / 2;
    let coordTop = (coords.top + coords.bottom) / 2;
    console.log(`${coords.left} ${coords.top} ${coords.bottom}`);
    gameResText.style.left = coordLeft + "px";
    gameResText.style.top = coordTop + "px";
  };

  const displayResult = () => {
    calcResultCoords();
    gameResContainer.style.display = "block";
  };

  const hideResult = () => {
    gameResContainer.style.display = "none";
  };

  return { calcResultCoords, displayResult, hideResult };
})();

const game = (() => {
  const checkPlayerWin = (player) => {
    const checkIfWin = () => {
      for (let i = 0; i < 3; i++) {
        if (
          (gameBoard.array[i] === player.mark &&
            gameBoard.array[i + 3] === player.mark &&
            gameBoard.array[i + 6] === player.mark) || //columns
          (gameBoard.array[i * 3] === player.mark &&
            gameBoard.array[i * 3 + 1] === player.mark &&
            gameBoard.array[i * 3 + 2] === player.mark) // rows
        ) {
          console.log(`${player.name} (${player.mark}) wins!`);

          return {
            result: "win",
            name: player.name,
            mark: player.mark,
          };
        }
      }
      // diagonal
      if (
        (gameBoard.array[0] === player.mark &&
          gameBoard.array[4] === player.mark &&
          gameBoard.array[8] === player.mark) ||
        (gameBoard.array[2] === player.mark &&
          gameBoard.array[4] === player.mark &&
          gameBoard.array[6] === player.mark)
      ) {
        console.log(`${player.name} (${player.mark}) wins!`);
        return {
          result: "win",
          name: player.name,
          mark: player.mark,
        };
      }
    };

    const checkIfTie = () => {
      let defFlag = true;

      for (let i = 0; i < 9; i++) {
        defFlag = defFlag && gameBoard.array[i] !== undefined;
      }

      if (defFlag) {
        console.log("It's a tie!");
        return { result: "tie" };
      }
    };

    let result = checkIfWin();
    if (result === undefined) result = checkIfTie();
    if (result !== undefined) {
      return result;
    }

    return { result: "none" };
  };

  const checkWin = (player1, player2) => {
    let resultX = checkPlayerWin(player1);
    let resultO = checkPlayerWin(player2);
    if (resultX.result === "win") {
      gameResText.textContent = `${resultX.name} (${resultX.mark}) wins!`;
      displayController.displayResult();
      return resultX.result;
    } else if (resultO.result === "win") {
      gameResText.textContent = `${resultO.name} (${resultO.mark}) wins!`;
      displayController.displayResult();
      return resultO.result;
    } else if (resultX.result === "tie" || resultO.result === "tie") {
      gameResText.textContent = "It's a tie!";
      displayController.displayResult();
      return "tie";
    }
  };

  let isNowX = true;

  const playGame = (player1, player2) => {
    const squares = document.querySelectorAll(".square");

    squares.forEach((square) => {
      square.addEventListener(
        "click",
        () => {
          if (gameBoard.array[square.id.slice(-1)] === undefined) {
            if (isNowX) {
              player1.placeMark(square);
            } else {
              player2.placeMark(square);
            }
            isNowX = !isNowX;
            console.log("play game listener test");
            checkWin(player1, player2);
          }
        },
        { once: true }
      );
    });
    window.addEventListener("click", (event) => {
      if (event.target == gameResContainer) {
        displayController.hideResult();
        restartGame(player1, player2);
      }
    });
  };

  const restartGame = (player1, player2) => {
    gameBoard.array = [];
    isNowX = true;
    gameBoard.reset();
    playGame(player1, player2);
  };
  return { playGame };
})();

// Factories
const player = (name, mark) => {
  const placeMark = (square) => {
    square.textContent = mark;
    gameBoard.array[square.id.slice(-1)] = mark;
  };

  return { name, mark, placeMark };
};

window.addEventListener("resize", () => {
  if (gameResContainer.style.display === "block") {
    displayController.calcResultCoords();
  }
});

const player1X = player("Jeff", "X");
const player2O = player("Alex", "O");

game.playGame(player1X, player2O);
