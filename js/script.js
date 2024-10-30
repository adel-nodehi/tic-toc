"use strict";

// Selectors
const container = document.querySelector(".tic-toc-container");
const playerNumber = document.querySelector(".player-num");

const boardTrack = Array.from({ length: 9 }, () => null);
let whoIsPlaying = 1; // 1 2
let gameIsOver = false;
let whoIsWinner = null;

/**
 * [ 1, 2, 1,
 *   2, 1, 1,
 *   1, 2, 1 ]
 */

//Function
const checkItemEquality = function (item1, item2, item3) {
  if (item1 === item2 && item2 === item3 && item3 !== null) {
    whoIsWinner = item1;
    alert(`player ${whoIsPlaying} wins.`);
    gameIsOver = true;
  }
};

const checkHowIsWinner = function () {
  if (gameIsOver) return;

  // vertical
  for (let i = 0; i < 3; i++) {
    const item1 = boardTrack[0 + i * 3]; // 0 + i * 3
    const item2 = boardTrack[1 + i * 3]; // 1 + i * 3
    const item3 = boardTrack[2 + i * 3]; // 2 + i * 3

    checkItemEquality(item1, item2, item3);
  }

  // horizontal
  for (let i = 0; i < 3; i++) {
    /////////////////////////////  i => 0    1    2
    const item1 = boardTrack[0 + i]; // 0    1    2
    const item2 = boardTrack[3 + i]; // 3    4    5
    const item3 = boardTrack[6 + i]; // 6    7    8

    checkItemEquality(item1, item2, item3);
  }

  for (let i = 2; i <= 4; i += 2) {
    ////////////////////////////// i => 2 4
    const item1 = boardTrack[4 - i]; // 2 0 // -
    const item2 = boardTrack[4]; ////// 4 4
    const item3 = boardTrack[4 + i]; // 6 8 // +

    checkItemEquality(item1, item2, item3);
  }

  const draw = boardTrack.reduce((acc, cur) => acc && cur, true);
  if (draw) {
    alert("Draw");
    gameIsOver = true;
  }
};

container.addEventListener("click", function (e) {
  if (gameIsOver) return;

  const currentCell = e.target.closest(".cell");

  // check if cell is not empty
  if (currentCell.innerHTML) {
    alert("click somewhere else");
    return;
  }

  // add shape
  const shape = document.createElement("div");

  if (whoIsPlaying === 1) shape.classList.add("circle");

  if (whoIsPlaying === 2) shape.classList.add("line-throw");

  currentCell.append(shape);

  // track players
  const index = Number(currentCell.dataset.index);
  boardTrack[index] = whoIsPlaying;

  // check
  checkHowIsWinner();

  // switch player
  whoIsPlaying = whoIsPlaying === 1 ? 2 : 1;

  // update player badge
  playerNumber.textContent = whoIsPlaying;
});
