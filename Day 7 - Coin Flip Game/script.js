let heads = 0;
let tails = 0;
let coin = document.querySelector(".coin");
let flip = document.querySelector("#flip-button");
let reset = document.querySelector("#reset-button");

flip.addEventListener("click", function () {
  let random = Math.random();
  coin.style.animation = "none";
  if (random < 0.5) {
    setTimeout(function () {
      coin.style.animation = "spin-heads 3s forwards";
    }, 100);
    heads++;
  } else {
    setTimeout(function () {
      coin.style.animation = "spin-tails 3s forwards";
    }, 100);
    tails++;
  }
  setTimeout(updateStats, 3000);
  disableButton();
});

function updateStats() {
  document.querySelector("#heads-count").textContent = `Heads: ${heads}`;
  document.querySelector("#tails-count").textContent = `Tails: ${tails}`;
}

function disableButton() {
  flip.disabled = true;
  setTimeout(function () {
    flip.disabled = false;
  }, 3000);
}

reset.addEventListener("click", function () {
  coin.style.animation = "none";
  heads = 0;
  tails = 0;
  updateStats();
});
