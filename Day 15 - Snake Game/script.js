const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY;
let snakeX = 10,
  snakeY = 10;
let velocityX = 0,
  velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;

// Get high score from local storage if it exists or set it to 0
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML = `High Score: ${highScore}`;

// Randomly generate food position
const updateFoodPosition = () => {
  // Passing a random 1 - 30 value as food position
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
  // Clear the timer and alert the user and reload the page
  clearInterval(setIntervalId);
  alert("Game Over! Press OK to restart.");
  location.reload();
};

// Change velocity of snake based on key pressed
const changeDirection = (event) => {
  if (event.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (event.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (event.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (event.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
};

// Call changeDirection function when key is pressed
controls.forEach((button) =>
  button.addEventListener("click", () =>
    changeDirection({ key: button.dataset.key })
  )
);

const initGame = () => {
  if (gameOver) return handleGameOver();
  let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

  // If snake eats food, update food position and add new body part to snake
  if (snakeX === foodX && snakeY === foodY) {
    updateFoodPosition();
    snakeBody.push([foodY, foodX]); // Add new body part to snake
    score++; // Increment score
    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);
    scoreElement.innerHTML = `Score: ${score}`;
    highScoreElement.innerHTML = `High Score: ${highScore}`;
  }
  // Update snake head position based on velocity
  snakeX += velocityX;
  snakeY += velocityY;

  // Update snake body position based on snake head position
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  snakeBody[0] = [snakeX, snakeY]; // Update snake head position

  // If snake hits the wall, game over
  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    return (gameOver = true);
  }

  // Render snake body
  for (let i = 0; i < snakeBody.length; i++) {
    // add div for each body part
    html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    // If snake hits itself, game over
    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      gameOver = true;
    }
  }
  playBoard.innerHTML = html;
};

updateFoodPosition();
setIntervalId = setInterval(initGame, 100 - score * 5);
document.addEventListener("keyup", changeDirection);
