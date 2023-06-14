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

  let player1 = Player("x", "x", true);
  let player2 = Player("O", "O", false);

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

  function handleButtons() {
    let addPlayersBtn = document.querySelector("#addBtn");
    let addPlayersForm = document.querySelector(".playersForm");
    addPlayersBtn.addEventListener("click", () => {
      addPlayersForm.style.display = "flex";
      addPlayersForm.style.transform = "scale(1)";
    });
    let submitBtn = document.querySelector("#submitBtn");
    let input1 = document.querySelector("#player1");
    let input2 = document.querySelector("#player2");
    submitBtn.addEventListener("click", () => {
      addPlayersForm.style.display = "none";
      addPlayersForm.style.transform = "scale(0)";
      player1.name = input1.value;
      player2.name = input2.value;
    });
    let resetBtn = document.querySelector("#reset");
    resetBtn.addEventListener("click", reset);
  }

  function reset() {
    _winDiv.textContent = "";
    changeTurns();
    for (let i = 0; i < gameBoard._gameBoard.length; i++) {
      let field = document.querySelector(`[data-index="${i}"]`);
      field.innerHTML = "";
    }
    for (let j = 0; j < gameBoard._gameBoard.length; j++) {
      gameBoard._gameBoard[j] = "";
    }
    _countTurns = 0;
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

  let _winDiv = document.querySelector(".win");
  function printWinner(name) {
    _winDiv.textContent = `${name} has won the game!`;
  }

  function printTie() {
    _winDiv.textContent = "It's a tie!";
  }

  function changeTurns() {
    player1.turn = !player1.turn;
    player2.turn = !player2.turn;
  }

  handleClick();
  handleButtons();
})();
