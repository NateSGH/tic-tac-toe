// Modules
const gameBoard = (() => {
  let array = [];
  const fill = () => {
    const squares = document.querySelectorAll(".square");
    squares.forEach((square, index) => {
      square.textContent = array[index];
    });
  };
  return { array, fill };
})();

const game = (() => {
  const gameboardCont = document.querySelector(".gameboard-container");
  const gameResContainer = document.querySelector(".game-result-container");
  const gameResText = document.querySelector(".game-result-container");

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

    console.log("test return");
    return { result: "none" };
  };

  const checkWin = (player1, player2) => {
    let resultX = checkPlayerWin(player1);
    let resultO = checkPlayerWin(player2);
    if (resultX.result === "win") {
      gameResText.textContent = `${resultX.name} (${resultX.mark}) wins!`;
      displayResult();
      return resultX.result;
    } else if (resultO.result === "win") {
      gameResText.textContent = `${resultO.name} (${resultO.mark}) wins!`;
      displayResult();
      return resultO.result;
    } else if (resultX.result === "tie" || resultO.result === "tie") {
      gameResText.textContent = "It's a tie!";
      displayResult();
      return "tie";
    }
  };

  let clicks = 0;

  const playGame = (player1, player2) => {
    player1.placeMark();
    player2.placeMark();

    let listener = (e) => {
      let gameRes = game.checkWin(player1, player2);
      if (gameRes === "win" || gameRes === "tie") {
        return;
      } else if (clicks < 5) {
        clicks++;
        console.log(clicks);
        player1.placeMark();
        player2.placeMark();
        console.log("play game test");

        // game.checkWin(player1, player2);
      }
    };
    gameboardCont.addEventListener("click", listener);
  };

  const displayResult = () => {
    gameResContainer.style.display = "block";
  };

  const hideResult = () => {
    gameResContainer.style.display = "none";
  };

  const restartGame = () => {};
  return { checkWin, playGame };
})();

// Factories
const player = (name, mark) => {
  const gameboardCont = document.querySelector(".gameboard-container");

  const placeMark = () => {
    let listener = (e) => {
      if (gameBoard.array[e.target.id.slice(-1)] === undefined) {
        e.target.textContent = mark;
        gameBoard.array[e.target.id.slice(-1)] = mark;
        gameboardCont.removeEventListener("click", listener);

        game.checkWin(player1X, player2O);
      }
    };

    gameboardCont.addEventListener("click", listener);
  };

  return { name, mark, placeMark };
};

const player1X = player("Jeff", "X");
const player2O = player("Alex", "O");

game.playGame(player1X, player2O);
