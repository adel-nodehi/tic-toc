"use strict";

// Selectors
const container = document.querySelector(".tic-toc-container");
const playerNumber = document.querySelector(".player-num");

const boardTrack = Array.from({ length: 9 }, () => null);
let whoIsPlaying = 1; // 1 2
let gameIsOver = false;

/**
 * [ 1, 2, 1,
 *   2, 1, 1,
 *   1, 2, 1 ]
 */

//Function
const checkHowIsWinner = function () {
  if (gameIsOver) return;

  let whoIsWinner = null;

  // vertical
  for (let i = 0; i < 3; i++) {
    const item1 = boardTrack[0 + i * 3]; // 0 + i * 3
    const item2 = boardTrack[1 + i * 3]; // 1 + i * 3
    const item3 = boardTrack[2 + i * 3]; // 2 + i * 3

    if (item1 === item2 && item2 === item3 && item3) {
      whoIsWinner = item1;
      alert(`user ${whoIsPlaying} wins.`);
      gameIsOver = true;

      return;
    }
  }

  console.log(whoIsWinner);
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

  console.log(boardTrack);
});
