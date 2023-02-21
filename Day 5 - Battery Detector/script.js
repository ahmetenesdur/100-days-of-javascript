initBattery();

function initBattery() {
  const batteryLiquid = document.querySelector(".Bliquid");
  const batteryStatus = document.querySelector(".Bstatus");
  const percentage = document.querySelector(".Bpercentage");
  navigator.getBattery().then((battery) => {
    updateBattery = () => {
      let level = Math.floor(battery.level * 100);
      percentage.innerHTML = level + "%";
      batteryLiquid.style.height = `${parseInt(battery.level * 100)}%`;
      if (level == 100) {
        batteryStatus.innerHTML = `Battery Full <i class="ri-battery-2-fill green-color"></i>`;
        batteryLiquid.style.height = "100%";
      } else if ((level <= 20) & !battery.charging) {
        batteryStatus.innerHTML = `Low Charge <i class="ri-plug-line animated-red animated-red"></i>`;
      } else if ((level <= 50) & !battery.charging) {
        batteryStatus.innerHTML = `Normal Charge <i class="ri-plug-line animated-orange"></i>`;
      } else if (battery.charging) {
        batteryStatus.innerHTML = `Charging <i class="ri-battery-charge-line animated-green"></i>`;
      } else {
        batteryStatus.innerHTML = "";
      }

      if (level <= 20) {
        batteryLiquid.classList.add("gradient-color-red");
        batteryLiquid.classList.remove(
          "gradient-color-green",
          "gradient-color-orange",
          "gradient-color-yellow"
        );
      } else if (level <= 50) {
        batteryLiquid.classList.add("gradient-color-orange");
        batteryLiquid.classList.remove(
          "gradient-color-green",
          "gradient-color-red",
          "gradient-color-yellow"
        );
      } else if (level <= 80) {
        batteryLiquid.classList.add("gradient-color-yellow");
        batteryLiquid.classList.remove(
          "gradient-color-green",
          "gradient-color-orange",
          "gradient-color-red"
        );
      } else {
        batteryLiquid.classList.add("gradient-color-green");
        batteryLiquid.classList.remove(
          "gradient-color-red",
          "gradient-color-orange",
          "gradient-color-yellow"
        );
      }
    };
    updateBattery();
    battery.addEventListener("chargingchange", updateBattery);
    battery.addEventListener("levelchange", updateBattery);
  });
}
