const gameBoard = (function () {
  let _gameBoard = ["x", "x", "x", "x", "x", "x", "x", "x", "x"];
  function render() {
    for (let i = 0; i < _gameBoard.length; i++) {
      let currentField = document.querySelector(`[data-index="${i}"]`);
      currentField.innerHTML = _gameBoard[i];
    }
  }
  return { render };
})();
