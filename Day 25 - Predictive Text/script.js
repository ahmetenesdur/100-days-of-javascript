// Create an array of words to be used as suggestions for user inputs.
let words = [
  "Apple",
  "Pencil",
  "Pen",
  "Chair",
  "Helmet",
  "Grapes",
  "Tub",
  "Trophy",
  "Cookie",
  "Donut",
  "Shirt",
  "Bat",
  "Ash",
  "Bell",
  "Chat",
  "Ball",
  "Eye",
  "Fish",
  "Zip",
  "Game",
  "Juice",
  "Orange",
  "Fan",
  "Ice",
  "Joke",
  "Kite",
  "Lamp",
  "Mug",
  "Nail",
  "Oven",
  "Pig",
  "Queen",
  "Rat",
  "Sun",
];

// Sort the array in alphabetical order.
words.sort();

// Cache the input and suggestion elements to variables using their respective IDs.
let input = document.getElementById("input");
let suggestion = document.getElementById("suggestion");

// Clear input and suggestion when the window finishes loading.
window.onload = () => {
  input.value = "";
  clearSuggestion();
};

// Function to clear the suggestion element's innerHTML.
const clearSuggestion = () => {
  suggestion.innerHTML = "";
};

// Function to check character cases of a word based on the current input value.
const caseCheck = (word) => {
  // Split the word into an array of characters.
  word = word.split("");
  let inputVal = input.value;

  for (let i in inputVal) {
    if (inputVal[i] == word[i]) {
      // If the characters match, continue to the next iteration.
      continue;
    } else if (inputVal[i].toUpperCase() == word[i]) {
      // If the input character is uppercase, update the word character to lowercase.
      word.splice(i, 1, word[i].toLowerCase());
    } else {
      // Otherwise, update the word character to uppercase.
      word.splice(i, 1, word[i].toUpperCase());
    }
  }
  // Join the modified word back into a string and return it.
  return word.join("");
};

// Listen for input events and update the suggestion element based on the current input value.
input.addEventListener("input", (e) => {
  // Clear previous suggestions from the suggestion element.
  clearSuggestion();

  // Create a regular expression based on the current input value.
  let regex = new RegExp(`^${input.value}`, "i");

  // Iterate through each word in the suggested words array.
  for (let i in words) {
    // Check if the current word matches the input value based on the regex pattern and ensure that the input value isn't empty.
    if (regex.test(words[i]) && input.value != "") {
      // Modify the case of the word based on the input value and update the suggestion element with it.
      words[i] = caseCheck(words[i]);
      suggestion.innerHTML = words[i];
      // Break out of the loop to only provide one suggestion at a time.
      break;
    }
  }
});

// Listen for keydown events and update the input value and suggestion element if the enter key is pressed and a suggestion exists.
input.addEventListener("keydown", (e) => {
  if (e.key == "Enter" && suggestion.innerText != "") {
    e.preventDefault();
    input.value = suggestion.innerText;

    clearSuggestion();
  }
});
