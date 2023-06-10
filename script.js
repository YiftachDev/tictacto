const game = function () {
  const gameBoard = (function () {
    let _gameBoard = ["", "", "", "", "", "", "", "", ""];
    function render() {
      for (let i = 0; i < _gameBoard.length; i++) {
        let currentField = document.querySelector(`[data-index="${i}"]`);
        currentField.innerHTML = _gameBoard[i];
      }
    }
    return { render };
  })();

  function Player(name, sign) {
    return { name, sign };
  }
};
