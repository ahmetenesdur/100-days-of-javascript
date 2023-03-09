const dice = document.querySelector(".dice");
const rollBtn = document.querySelector(".roll");
const result = document.querySelector(".result span");

const randomDice = () => {
  const random = Math.floor(Math.random() * 6) + 1;
  rollDice(random);
};

const rollDice = (random) => {
  dice.style.animation = "rolling 4s";
  rollBtn.disabled = true;

  setTimeout(() => {
    switch (random) {
      case 1:
        dice.style.transform = "rotateX(0deg) rotateY(0deg)";
        break;

      case 6:
        dice.style.transform = "rotateX(180deg) rotateY(0deg)";
        break;

      case 2:
        dice.style.transform = "rotateX(-90deg) rotateY(0deg)";
        break;

      case 5:
        dice.style.transform = "rotateX(90deg) rotateY(0deg)";
        break;

      case 3:
        dice.style.transform = "rotateX(0deg) rotateY(90deg)";
        break;

      case 4:
        dice.style.transform = "rotateX(0deg) rotateY(-90deg)";
        break;

      default:
        break;
    }

    result.textContent = random;
    dice.style.animation = "none";
    rollBtn.disabled = false;
  }, 4050);
};

rollBtn.addEventListener("click", randomDice);
