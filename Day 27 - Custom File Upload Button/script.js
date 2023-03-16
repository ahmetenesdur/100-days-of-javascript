// Get the file input and files list element from the HTML page
let fileInput = document.getElementById("fileInput");
let fileList = document.getElementById("filesList");
// Get the number of files element so we can display how many files have been selected
let numOfFiles = document.getElementById("numOfFiles");

// Add an event listener to the file input so when a file is selected, this function runs
fileInput.addEventListener("change", () => {
  // Clear any previous entries in the files list
  fileList.innerHTML = "";
  // Set the text content of the "numOfFiles" element to show how many files have been selected
  numOfFiles.textContent = `${fileInput.files.length} Files Selected`;

  // Loop through all the files that have been selected and add them to the list
  for (i of fileInput.files) {
    // Create a new file reader object so we can read the contents of each file
    let reader = new FileReader();
    // Create a new list item element to hold the details of each file
    let listItem = document.createElement("li");
    // Get the name and size of the current file being processed
    let fileName = i.name;
    let fileSize = (i.size / 1024).toFixed(1);
    // Set the inner HTML of the list item to show the file name and size
    listItem.innerHTML = `<p>${fileName}</p><p>${fileSize}KB</p>`;
    // If the file size is above 1MB, convert the size to MB instead of KB and update the list item's inner HTML
    if (fileSize >= 1024) {
      fileSize = (fileSize / 1024).toFixed(1);
      listItem.innerHTML = `<p>${fileName}</p><p>${fileSize}MB</p>`;
    }
    // If the file size is above 1GB, convert the size to GB instead of MB and update the list item's inner HTML
    if (fileSize >= 1024) {
      fileSize = (fileSize / 1024).toFixed(1);
      listItem.innerHTML = `<p>${fileName}</p><p>${fileSize}GB</p>`;
    }
    // Add the list item to the files list element
    fileList.appendChild(listItem);
  }
});
