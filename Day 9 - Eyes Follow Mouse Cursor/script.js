// Selecting the eye elements
let eyeDiv = document.querySelectorAll(".eye");

// Mouse move for devices with mouse or touchpad
let events = ["mousemove", "touchmove"];

// Check if the device has a touch screen
function isTouchDevice() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}

// Same function for mouse and touch
events.forEach((eventType) => {
  document.addEventListener(eventType, (event) => {
    eyeDiv.forEach((eye) => {
      // getBoundingClientRect() returns the size of an element and its position relative to the viewport.
      let eyeX = eye.getBoundingClientRect().left + eye.clientWidth / 2;
      let eyeY = eye.getBoundingClientRect().top + eye.clientHeight / 2;

      // Mouse move event
      var x = !isTouchDevice() ? event.clientX : event.touches[0].clientX;
      var y = !isTouchDevice() ? event.clientY : event.touches[0].clientY;

      // Calculate the angle between the eye and the mouse cursor
      let radian = Math.atan2(x - eyeX, y - eyeY);
      // Convert the angle to degrees
      let rot = radian * (180 / Math.PI) * -1 + 180;
      // Rotate the eye
      eye.style.transform = "rotate(" + rot + "deg)";
    });
  });
});
