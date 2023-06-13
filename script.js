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
      if (_gameBoard[index] != "") {
        return;
      }
      _gameBoard[index] = mark;
      render();
      changeTurns();
    }
    return { updateBoard, _gameBoard };
  })();

  function Player(name, mark, turn) {
    return { name, mark, turn };
  }

  let player1 = Player("a", "x", true);
  let player2 = Player("b", "O", false);

  let _countTurns = 0;
  function handleClick() {
    for (let i = 0; i < 9; i++) {
      let field = document.querySelector(`[data-index="${i}"]`);
      field.addEventListener("click", () => {
        if (player1.turn)
          gameBoard.updateBoard(field.getAttribute("data-index"), "x");
        else gameBoard.updateBoard(field.getAttribute("data-index"), "O");
        _countTurns++;
        checkWin();
      });
    }
  }

  const _winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function checkWin() {
    console.log(_countTurns);
    for (const winCondition of _winConditions) {
      if (
        gameBoard._gameBoard[winCondition[0]] ==
          gameBoard._gameBoard[winCondition[1]] &&
        gameBoard._gameBoard[winCondition[1]] ==
          gameBoard._gameBoard[winCondition[2]]
      ) {
        if (gameBoard._gameBoard[winCondition[0]] == "x") {
          printWinner(player1.name);
          return;
        } else if (gameBoard._gameBoard[winCondition[0]] == "O") {
          printWinner(player2.name);
          return;
        }
      }
    }
    if (_countTurns >= 9) {
      printTie();
    }
  }

  function printWinner(name) {
    alert(`${name} has won the game!`);
  }

  function printTie() {
    alert("It's a tie!");
  }

  function changeTurns() {
    player1.turn = !player1.turn;
    player2.turn = !player2.turn;
  }

  handleClick();
})();
