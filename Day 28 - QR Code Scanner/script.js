// Selecting required elements from DOM
const wrapper = document.querySelector(".wrapper"),
  form = document.querySelector("form"),
  fileInp = form.querySelector("input"),
  infoText = form.querySelector("p"),
  closeBtn = document.querySelector(".close"),
  copyBtn = document.querySelector(".copy");

// Defining function to handle fetch request
function fetchRequest(file, formData) {
  infoText.innerText = "Scanning QR Code..."; // display Scanning QR Code message in infoText (a <p> element)

  // making a POST request to the given url with body containing the uploaded file
  fetch("http://api.qrserver.com/v1/read-qr-code/", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json()) // if response is recieved, parsing it as JSON
    .then((result) => {
      // extract data from JSON response
      result = result[0].symbol[0].data;

      // updating infoText based on result whether QR code scanned successfully or not.
      infoText.innerText = result
        ? "Upload QR Code to Scan"
        : "Couldn't Scan QR Code";

      // if successful result is obtained, updating textarea and image
      if (!result) return;
      document.querySelector("textarea").innerText = result;
      form.querySelector("img").src = URL.createObjectURL(file);

      // add active class to wrapper
      wrapper.classList.add("active");
    })
    .catch(() => {
      infoText.innerText = "Couldn't scan QR Code"; // updating failure message in infoText
    });
}

// Adding change event listener to file input element.
fileInp.addEventListener("change", async (e) => {
  let file = e.target.files[0]; // get uploaded file
  if (!file) return; // if no file is selected, do nothing

  // create formdata object with uploaded file
  let formData = new FormData();
  formData.append("file", file);

  // call fetchRequest function with file and formData object
  fetchRequest(file, formData);
});

// Adding click event listener to copy button.
copyBtn.addEventListener("click", () => {
  let text = document.querySelector("textarea").textContent; // get text from textarea element
  navigator.clipboard.writeText(text); // copy text to clipboard
});

// Adding click event listener to form element.
form.addEventListener("click", () => fileInp.click()); // when user clicks anywhere in the form, trigger click event on file input element

// Adding click event listener to close button.
closeBtn.addEventListener("click", () => wrapper.classList.remove("active")); // when user clicks the close button, remove active class from wrapper element
