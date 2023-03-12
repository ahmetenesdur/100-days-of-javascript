let days = document.getElementById("days");
let hours = document.getElementById("hours");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");

let dayCircle = document.getElementById("day-circle");
let hourCircle = document.getElementById("hour-circle");
let minuteCircle = document.getElementById("minute-circle");
let secondCircle = document.getElementById("second-circle");

let dayDot = document.querySelector(".day-dot");
let hourDot = document.querySelector(".hour-dot");
let minuteDot = document.querySelector(".minute-dot");
let secondDot = document.querySelector(".second-dot");

const dateInput = document.querySelector("#datetime");
let endDate;

function updateEndDate() {
  const newDateValue = dateInput.value;

  endDate = newDateValue;
}

dateInput.addEventListener("input", updateEndDate);
dateInput.addEventListener("change", updateEndDate);

let timer = setInterval(function () {
  let now = new Date().getTime();
  let endDateTime = new Date(endDate).getTime();
  let distance = endDateTime - now;

  let d = Math.floor(distance / (1000 * 60 * 60 * 24));
  let h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let s = Math.floor((distance % (1000 * 60)) / 1000);

  days.innerHTML = d + "<br><span>Days</span>";
  hours.innerHTML = h + "<br><span>Hours</span>";
  minutes.innerHTML = m + "<br><span>Minutes</span>";
  seconds.innerHTML = s + "<br><span>Seconds</span>";

  dayCircle.style.strokeDashoffset = 0 + (440 * d) / 365;
  hourCircle.style.strokeDashoffset = 0 + (440 * h) / 24;
  minuteCircle.style.strokeDashoffset = 0 + (440 * m) / 60;
  secondCircle.style.strokeDashoffset = 0 + (440 * s) / 60;

  dayDot.style.transform = `rotateZ(-${d * 0.986}deg`;
  hourDot.style.transform = `rotateZ(-${h * 15}deg`;
  minuteDot.style.transform = `rotateZ(-${m * 6}deg`;
  secondDot.style.transform = `rotateZ(-${s * 6}deg`;

  if (distance < 0) {
    clearInterval(timer);
    document.getElementById("time").style.display = "none";
    document.querySelector(".finished").style.display = "block";
  }
});
