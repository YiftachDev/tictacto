const game = (function () {
  const gameBoard = (function () {
    let _gameBoard = ["", "", "", "", "", "", "", "", ""];
    function render() {
      for (let i = 0; i < _gameBoard.length; i++) {
        let currentField = document.querySelector(`[data-index="${i}"]`);
        currentField.innerHTML = _gameBoard[i];
      }
    }
    function updateBoard(index, mark) {
      _gameBoard[index] = mark;
      render();
    }
    return { render, updateBoard };
  })();

  function Player(name, mark, turn) {
    return { name, mark, turn };
  }

  let player1 = new Player("a", "x", true);
  let player2 = new Player("b", "O", false);

  function handleClick() {
    for (let i = 0; i < 9; i++) {
      let field = document.querySelector(`[data-index="${i}"]`);
      field.addEventListener("click", () => {
        if (player1.turn)
          gameBoard.updateBoard(field.getAttribute("data-index"), "x");
        else gameBoard.updateBoard(field.getAttribute("data-index"), "O");
        player1.turn = !player1.turn;
        player2.turn = !player2.turn;
      });
    }
  }
  return { handleClick };
})();

game.handleClick();
