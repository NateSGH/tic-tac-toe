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
  const checkPlayerWin = (player) => {
    let gameInfo = {
      result: "",
      name: "",
      mark: "",
    };
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
    // TODO: tie
    // if () {
    //   console.log("It's a tie!");
    //   return { result: "tie" };
    // }

    console.log("test return");
    return { result: "none" };
  };
  const checkWin = (player1, player2) => {
    let resultX = checkPlayerWin(player1);
    let resultO = checkPlayerWin(player2);
    if (resultX.result === "win") {
      alert(`${resultX.name} (${resultX.mark}) wins!`);
    } else if (resultO.result === "win") {
      alert(`${resultO.name} (${resultO.mark}) wins!`);
    } else if (resultX.result === "tie" || resultO.result === "tie") {
      alert("It's a tie!");
    }
  };
  const playGame = () => {};
  const restartGame = () => {};
  return { checkWin };
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

player1X.placeMark();
player2O.placeMark();
player1X.placeMark();
player2O.placeMark();
player1X.placeMark();
player2O.placeMark();
player1X.placeMark();
player2O.placeMark();
player1X.placeMark();
player2O.placeMark();
