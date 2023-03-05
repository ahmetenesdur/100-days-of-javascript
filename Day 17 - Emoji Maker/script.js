const emoji = document.querySelector(".emoji");

const colors = [
  "#4bff81",
  "#4bb4ff",
  "#ff702e",
  "#b88cff",
  "#ffd21f",
  "#761ab9",
];
const eyes = document.querySelector(".eyes");
const eyebrows = document.querySelector(".eyebrows");
const mouth = document.querySelector(".mouth");

const buttons = document.querySelectorAll(".buttons-container button");
const colorBtn = document.getElementById("color");
const eyesBtn = document.getElementById("eyes");
const eyebrowsBtn = document.getElementById("eyebrows");
const mouthBtn = document.getElementById("mouth");

// Setting up counters for different images
let counter1 = 0;
let counter2 = 0;
let counter3 = 0;
let counter4 = 0;

// Total number of images
let totalCounts = {
  eyeCount: 5,
  eyebrowsCount: 4,
  mouthCount: 5,
};

// Changing the background color of the emoji
colorBtn.addEventListener("click", () => {
  emoji.style.backgroundColor = colors[counter1];
  counter1 = counter1 < colors.length - 1 ? counter1 + 1 : 0;
});

// Changing the background color of the buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    button.style.backgroundColor = colors[counter1];
    counter1 = counter1 < colors.length - 1 ? counter1 + 1 : 0;
  });
});

// Changing the images of the emoji
eyesBtn.addEventListener("click", () => {
  eyes.setAttribute("src", `assets/eye-${counter2}.svg`);
  counter2 = counter2 < totalCounts.eyeCount - 1 ? counter2 + 1 : 0;
});

eyebrowsBtn.addEventListener("click", () => {
  eyebrows.setAttribute("src", `assets/eyebrow-${counter3}.svg`);
  counter3 = counter3 < totalCounts.eyebrowsCount - 1 ? counter3 + 1 : 0;
});

mouthBtn.addEventListener("click", () => {
  mouth.setAttribute("src", `assets/mouth-${counter4}.svg`);
  counter4 = counter4 < totalCounts.mouthCount - 1 ? counter4 + 1 : 0;
});
