// This function is called slide which would be triggered when a certain action takes place.
function slide() {
  // Declaring and initializing the variable slideValue to hold the value of the HTML element with ID slider.
  let slideValue = document.getElementById("slider").value;
  // Setting the clip-path property of the HTML element with ID comparison, using the calculated slideValue to specify the shape based on "polygon" coordinates.
  document.getElementById("comparison").style.clipPath =
    "polygon(0 0," + slideValue + "% 0," + slideValue + "% 100%, 0 100%)";
}
