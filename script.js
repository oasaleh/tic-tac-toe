const oBtn = document.getElementById('o-button');
const xBtn = document.getElementById('x-button');
const rBtn = document.getElementById('r-button');

const playerFactory = (mark) => {
  const playerMarks = ['', '', '', '', '', '', '', '', ''];
  return { playerMarks };
};
const oPlayer = playerFactory('O');
const xPlayer = playerFactory('X');

const board = (() => {
  /* -------------------------------- variables ------------------------------- */

  let currentMark;
  let boardMarks = ['', '', '', '', '', '', '', '', ''];
  const gameboard = document.querySelector('#gameboard');

  /* --------------------------------- methods -------------------------------- */

  const addEvents = () => {
    // oBtn.addEventListener('click', board.getMark);
    // xBtn.addEventListener('click', board.getMark);
    // rBtn.addEventListener('click', board.resetBoard);
  };
  const renderBoard = () => {
    let idCounter = 0;
    boardMarks.forEach((element) => {
      const cell = document.createElement('div');
      gameboard.appendChild(cell);
      cell.classList.add('cell');
      cell.id = idCounter;
      idCounter += 1;
      cell.addEventListener('click', board.addMark);
      //   cell.addEventListener('click', function (e) {
      //     console.log(e);
      if (element !== undefined) {
        cell.innerText = element;
      } else {
        cell.innerText = '';
      }
    });
  };
  const resetBoard = () => {
    currentMark = '';
    boardMarks = ['', '', '', '', '', '', '', '', ''];
    oPlayer.playerMarks = ['', '', '', '', '', '', '', '', ''];
    xPlayer.playerMarks = ['', '', '', '', '', '', '', '', ''];
    gameboard.innerHTML = '';
    renderBoard();
  };
  const getMark = (btn) => {
    currentMark = btn.target.innerText;
    // console.log(currentMark);
  };
  const addMark = (cell) => {
    const DOMCell = cell;
    if (!currentMark) {
      //   alert('Pick a mark!');
    } else if (DOMCell.target.innerText === '') {
      DOMCell.target.innerText = currentMark;
      const i = DOMCell.target.id;
      boardMarks[i] = currentMark;

      if (currentMark === 'O') {
        oPlayer.playerMarks[i] = currentMark;
        console.log(oPlayer.playerMarks);
        winCheck.checkWinner(oPlayer.playerMarks, currentMark);
      } else {
        xPlayer.playerMarks[i] = currentMark;
        console.log(xPlayer.playerMarks);
        winCheck.checkWinner(xPlayer.playerMarks, currentMark);
      }
      //   console.log(boardMarks);
    }
  };
  const showBoard = () => {
    gameboard.classList.remove('hidden');
  };
  const hideBoard = () => {
    gameboard.classList.add('hidden');
  };

  return {
    resetBoard,
    addEvents,
    renderBoard,
    showBoard,
    hideBoard,
    addMark,
    getMark,
  };
})();

const winCheck = (() => {
  const xWinningCombo = [
    ['X', 'X', 'X', '', '', '', '', '', ''],
    ['', '', '', 'X', 'X', 'X', '', '', ''],
    ['', '', '', '', '', '', 'X', 'X', 'X'],
    ['X', '', '', '', 'X', '', '', '', 'X'],
    ['', 'X', '', '', 'X', '', '', 'X', ''],
    ['', '', 'X', '', 'X', '', 'X', '', ''],
  ];
  const oWinningCombo = [
    ['O', 'O', 'O', '', '', '', '', '', ''],
    ['', '', '', 'O', 'O', 'O', '', '', ''],
    ['', '', '', '', '', '', 'O', 'O', 'O'],
    ['O', '', '', '', 'O', '', '', '', 'O'],
    ['', 'O', '', '', 'O', '', '', 'O', ''],
    ['', '', 'O', '', 'O', '', 'O', '', ''],
  ];
  const checkWinner = (array, mark) => {
    switch (mark) {
      case 'X':
        if (
          xWinningCombo.some((a) => array.every((v, i) => v === a[i]))
        ) {
          console.log('X Wins!');
        }
        break;
      case 'O':
        if (
          oWinningCombo.some((a) => array.every((v, i) => v === a[i]))
        ) {
          console.log('O Wins!');
        }
        break;
      default:
        console.log('nothing');
    }
  };
  return { checkWinner };
})();

board.renderBoard();
board.addEvents();

oBtn.addEventListener('click', board.getMark);
xBtn.addEventListener('click', board.getMark);
rBtn.addEventListener('click', board.resetBoard);
