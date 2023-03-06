let draggable = document.getElementById("draggable");
let initialX = 0,
  initialY = 0;
let moveElement = false;

// Mouse and touch events
let events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
  },
};

let deviceType = "";

// Check if device is touch or mouse
const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

isTouchDevice();

// Mouse down / touch start
draggable.addEventListener(events[deviceType].down, (e) => {
  e.preventDefault();
  // Get initial X and Y
  initialX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
  initialY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;

  // Set movement to true
  moveElement = true;
});

// Mouse move / touch move
draggable.addEventListener(events[deviceType].move, (e) => {
  // Check if movement is true
  if (moveElement) {
    e.preventDefault();
    let newX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
    let newY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;
    draggable.style.top = draggable.offsetTop - (initialY - newY) + "px";
    draggable.style.left = draggable.offsetLeft - (initialX - newX) + "px";
    initialX = newX;
    initialY = newY;
  }
});

// Mouse up / touch end
draggable.addEventListener(
  events[deviceType].up,
  (stopMovement = (e) => {
    moveElement = false;
  })
);

// Mouse leave
draggable.addEventListener("mouseleave", stopMovement);
// Touch cancel
draggable.addEventListener(events[deviceType].up, (e) => {
  moveElement = false;
});
