// Dom elements
const boxes = document.querySelectorAll(".box"),
  image = document.querySelector(".image");

// Loop through boxes
boxes.forEach((box) => {
  // Event listeners for drag and drop
  box.addEventListener("dragover", (e) => {
    e.preventDefault(); // Cancel the default action
    box.classList.add("hovered"); // Add class to box element
  });

  // Draggable element leaves the box element
  box.addEventListener("dragleave", () => {
    box.classList.remove("hovered");
  });

  // Draggable element is dropped in the box element
  box.addEventListener("drop", () => {
    box.appendChild(image); // Append image to box element
    box.classList.remove("hovered");
  });
});
