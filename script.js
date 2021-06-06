// Modules
const gameBoard = (() => {
  let array = []; // "X", "O", "X", "O", "X", "O", "X", "O", "X"
  const test = () => console.log("test");
  const fill = () => {
    const squares = document.querySelectorAll(".square");
    squares.forEach((square, index) => {
      square.textContent = array[index];
    });
  };
  return { test, fill };
})();
// displayController(?);

// Factories
const player = (name, mark) => {
  const squares = document.querySelectorAll(".square");
  const gameboard = document.querySelector(".gameboard-container");
  const placeMark = () => {

  return { name, mark, placeMark };
};

const player1X = player("Jeff", "X");
const player2O = player("Alex", "O");
