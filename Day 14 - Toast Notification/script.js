const notifications = document.querySelector(".notifications"),
  buttons = document.querySelectorAll(".buttons .btn");

// Toast details object with timer, icon and text for each type of toast
const toastDetails = {
  timer: 5000,
  success: {
    icon: "fa-circle-check",
    text: "Success: This is a success toast.",
  },
  error: {
    icon: "fa-circle-xmark",
    text: "Error: This is an error toast.",
  },
  warning: {
    icon: "fa-triangle-exclamation",
    text: "Warning: This is a warning toast.",
  },
  info: {
    icon: "fa-circle-info",
    text: "Info: This is an information toast.",
  },
};

const createToast = (id) => {
  // Get the icon and text from the toast details object for the toast based on the id
  const { icon, text } = toastDetails[id]; // Destructuring
  const toast = document.createElement("li"); // Create a new toast element
  toast.className = `toast ${id}`; // Add the class name and id to the toast element
  // Inner HTML for the toast element
  toast.innerHTML = `
<div class="column">
  <i class="fa-solid ${icon}"></i>
  <span>${text}</span>
</div>
<i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>
  `;
  notifications.appendChild(toast); // Append the toast element to the notifications element
  toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer); // Set a timeout to remove the toast
};

const removeToast = (toast) => {
  toast.classList.add("hide");
  if (toast.timeoutId) clearTimeout(toast.timeoutId); // Clear the timeout if the toast is removed before the timer ends
  setTimeout(() => toast.remove(), 500); // Remove the toast element after the animation is complete
};

// Add event listeners to the buttons to create a toast when clicked
buttons.forEach((btn) => {
  btn.addEventListener("click", () => createToast(btn.id));
});
