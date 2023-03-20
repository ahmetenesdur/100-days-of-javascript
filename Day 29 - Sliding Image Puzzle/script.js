// Define variables
const moves = document.getElementById("moves");
const container = document.querySelector(".container");
const startButton = document.getElementById("start-button");
const coverScreen = document.querySelector(".cover-screen");
const result = document.getElementById("result");

let currentElement = "";
let movesCount,
  imagesArr = [];

// Check if device is touchscreen
const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
};

// Generate a random number between 1 and 8
const randomNumber = () => Math.floor(Math.random() * 8) + 1;

// Get the row and column of an element using its data-position attribute
const getCoords = (element) => {
  const [row, col] = element.getAttribute("data-position").split("_");
  return [parseInt(row), parseInt(col)];
};

// Check if two elements are adjacent to each other
const checkAdjacent = (row1, row2, col1, col2) => {
  if (row1 == row2) {
    if (col2 == col1 - 1 || col2 == col1 + 1) {
      return true;
    }
  } else if (col1 == col2) {
    if (row2 == row1 - 1 || row2 == row1 + 1) {
      return true;
    }
  }
  return false;
};

// Generate an array of random image indices
const randomImages = () => {
  imagesArr.push(1);
  imagesArr.push(2);
  imagesArr.push(3);
  imagesArr.push(4);
  imagesArr.push(5);
  imagesArr.push(6);
  imagesArr.push(7);
  imagesArr.push(8);
  imagesArr.push(9);
};

// Generate the grid of image containers
const gridGenerator = () => {
  let count = 0;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let div = document.createElement("div");
      div.setAttribute("data-position", `${i}_${j}`);
      div.addEventListener("click", selectImage);
      div.classList.add("image-container");
      div.innerHTML = `<img src="assets/${imagesArr[count]}.jpg" class="image ${
        imagesArr[count] == 9 ? "target" : ""
      }" data-index="${imagesArr[count]}"/>`;
      count += 1;
      container.appendChild(div);
    }
  }
};

// Handle click event on an image container
const selectImage = (e) => {
  e.preventDefault();
  currentElement = e.target;
  let targetElement = document.querySelector(".target");
  let currentParent = currentElement.parentElement;
  let targetParent = targetElement.parentElement;

  const [row1, col1] = getCoords(currentParent);
  const [row2, col2] = getCoords(targetParent);

  if (checkAdjacent(row1, row2, col1, col2)) {
    // Swap the images
    currentElement.remove();
    targetElement.remove();
    let currentIndex = parseInt(currentElement.getAttribute("data-index"));
    let targetIndex = parseInt(targetElement.getAttribute("data-index"));
    currentElement.setAttribute("data-index", targetIndex);
    targetElement.setAttribute("data-index", currentIndex);
    currentParent.appendChild(targetElement);
    targetParent.appendChild(currentElement);
    let currentArrIndex = imagesArr.indexOf(currentIndex);
    let targetArrIndex = imagesArr.indexOf(targetIndex);
    [imagesArr[currentArrIndex], imagesArr[targetArrIndex]] = [
      imagesArr[targetArrIndex],
      imagesArr[currentArrIndex],
    ];

    if (imagesArr.join("") == "123456789") {
      // End the game if the images are in the correct order
      setTimeout(() => {
        coverScreen.classList.remove("hide");
        container.classList.add("hide");
        result.innerText = `Total Moves: ${movesCount}`;
        startButton.innerText = "RestartGame";
      }, 1000);
    }
    movesCount += 1;
    moves.innerText = `Moves: ${movesCount}`;
  }
};

// Start the game
startButton.addEventListener("click", () => {
  container.classList.remove("hide");
  coverScreen.classList.add("hide");
  container.innerHTML = "";
  imagesArr = [];
  randomImages();
  gridGenerator();
  movesCount = 0;
  moves.innerText = `Moves: ${movesCount}`;
});

// Show the cover screen when the page loads
window.onload = () => {
  coverScreen.classList.remove("hide");
  container.classList.add("hide");
};
