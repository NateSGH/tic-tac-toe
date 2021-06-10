// Modules
const gameBoard = (() => {
  let array = []; // ["X", "O", "X", "O", "X", "O", "X", "O", "X"];
  const test = () => console.log("test");
  const fill = () => {
    const squares = document.querySelectorAll(".square");
    squares.forEach((square, index) => {
      square.textContent = array[index];
    });
  };
  return { array, test, fill };
})();
// displayController(?);

// Factories
const player = (name, mark) => {
  const squares = document.querySelectorAll(".square");
  const gameboardCont = document.querySelector(".gameboard-container");

  const placeMark = () => {
    let listener = (e) => {
      console.log(gameBoard.array[e.target.id.slice(-1)]);
      if (gameBoard.array[e.target.id.slice(-1)] === undefined) {
        gameBoard.array[e.target.id.slice(-1)] = mark;
        e.target.textContent = mark;
        console.log(gameBoard.array);
        gameboardCont.removeEventListener("click", listener);
      }
    };
    gameboardCont.addEventListener("click", listener);
    // squares.forEach((square) => {
    //   let listener = function () {
    //     console.log("test");
    //     square.textContent = mark;
    //     // squares.forEach((sq) => {
    //     //   console.log("remove");
    //     //   sq.removeEventListener("click", listener, false);
    //     // });
    //   };

    //   square.addEventListener("click", listener, false);
    // });
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
