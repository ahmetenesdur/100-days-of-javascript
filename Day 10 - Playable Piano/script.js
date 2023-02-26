const pianoKeys = document.querySelectorAll(".piano-keys .key"),
  volumeSlider = document.querySelector(".volume-slider input"),
  keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [],
  audio = new Audio("tunes/a.wav"); // create an audio object with a default tune

const playTune = (tune) => {
  audio.src = `tunes/${tune}.wav`; // set the audio source
  audio.play(); // play the tune

  const clickedKey = document.querySelector(`.key[data-key="${tune}"]`); // get the clicked key element
  clickedKey.classList.add("active"); // add the active class to the clicked key
  setTimeout(() => {
    clickedKey.classList.remove("active"); // remove the active class after 0.2s
  }, 200);
};

pianoKeys.forEach((key) => {
  allKeys.push(key.dataset.key); // add all the keys to the allKeys array
  key.addEventListener("click", () => {
    playTune(key.dataset.key); // play the tune when a key is clicked
  });
});

const handleVolume = (e) => {
  audio.volume = e.target.value; // set the volume of the audio
};

const showHideKeys = () => {
  pianoKeys.forEach((key) => {
    key.classList.toggle("hide"); // show or hide the keys
  });
};

const pressKey = (e) => {
  if (allKeys.includes(e.key.toLowerCase())) {
    playTune(e.key.toLowerCase()); // play the tune when a key is pressed
  }
};

keysCheckbox.addEventListener("change", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
window.addEventListener("keydown", pressKey);
