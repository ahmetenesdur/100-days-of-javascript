const currentTime = document.querySelector("h1"),
  content = document.querySelector(".content"),
  selectMenu = document.querySelectorAll("select"),
  setAlarmButton = document.querySelector("button");

let alarmTime,
  isAlarmSet,
  ringing = new Audio("./assets/ringtone.mp3");

for (let i = 12; i > 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
  let am_pm = i == 1 ? "AM" : "PM";
  let option = `<option value="${am_pm}">${am_pm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
  let date = new Date(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds(),
    am_pm = "AM";

  if (hours >= 12) {
    hours = hours - 12;
    am_pm = "PM";
  }

  hours = hours == 0 ? (hours = 12) : hours;
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  currentTime.innerText = `${hours}:${minutes}:${seconds} ${am_pm}`;

  if (alarmTime === `${hours}:${minutes} ${am_pm}`) {
    ringing.play();
    ringing.loop = true;
    setAlarmButton.innerText = "Stop Alarm (Ringing)";
    setAlarmButton.style.backgroundColor = "red";
  }
});

function setAlarm() {
  if (isAlarmSet) {
    alarmTime = "";
    ringing.pause();
    content.classList.remove("disable");
    setAlarmButton.innerText = "Set Alarm";
    setAlarmButton.style.backgroundColor = "#1c1e26";
    return (isAlarmSet = false);
  }

  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;

  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AM/PM")
  ) {
    return alert("Please select a valid time");
  }

  alarmTime = time;
  isAlarmSet = true;
  content.classList.add("disable");
  setAlarmButton.innerText = "Stop Alarm";
}

setAlarmButton.addEventListener("click", setAlarm);
